import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../db.js";
import { sendWelcomeEmail, sendLoginVerificationCode, sendPasswordResetEmail } from "../services/emailService.js";
import dotenv from "dotenv";
dotenv.config();

const {JWT_SECRET} = process.env;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";


// User registration
export async function registerUser({ username, email, password }) {
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { username, email, password_hash },
        select: { id: true, username: true, email: true },
    });

    await sendWelcomeEmail(user.email, user.username);

    const token = jwt.sign(
        {   id: user.id, 
            username: user.username, 
            email: user.email 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { message: "Registration successful", user, token };
}


// User login
export async function loginUser({ identifier, password, ip, userAgent }) {
    const user = await prisma.user.findFirst({
        where: {
        OR: [{ email: identifier }, { username: identifier }],
        },
    });

    if (!user) {
        throw new Error("Invalid username or email");
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        throw new Error("Invalid password");
    }

    // Check for existing session (trusted device)
    const existingSession = await prisma.userSession.findFirst({
        where: {
        userId: user.id,
        ipAddress: ip,
        userAgent,
        },
    });

    // If it's a trusted device, proceed as usual
    if (existingSession) {
        const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
        );

        return {
        message: "Login successful",
        user: { 
            id: user.id, 
            username: user.username,
            email: user.email 
        },
        token,
        };
    }

    // If new device detected → send verification code to email
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await prisma.pendingLogin.create({
        data: {
        userId: user.id,
        code,
        ipAddress: ip,
        userAgent,
        expiresAt,
        },
    });

    await sendLoginVerificationCode(
        user.email, 
        user.username, 
        code, 
        ip, 
        userAgent
    );

    return {
        message: "Verification required",
        user: { 
            id: user.id,
            email: user.email 
        },
        next: "/api/auth/verify-login",
    };
    }



// Verify login
export async function verifyLogin({ email, code }) {
    const user = await prisma.user.findUnique({ where: { email } });
    // Check if user exists
    if (!user) {
        throw new Error("User not found");
    }

    // Check pending login
    const pending = await prisma.pendingLogin.findFirst({
        where: {
        userId: user.id,
        code,
        expiresAt: { gt: new Date() },
        },
    });

    // If no pending login or code expired
    if (!pending) {
        throw new Error("Invalid or expired verification code");
    }

    // If approved: create trusted session
    await prisma.userSession.create({
        data: {
        userId: user.id,
        ipAddress: pending.ipAddress,
        userAgent: pending.userAgent,
        },
    });

    // Clean up pending state
    await prisma.pendingLogin.delete({ where: { id: pending.id } });

    // Issue JWT token after verification
    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return {
        message: "Login verified successfully",
        user: { id: user.id, username: user.username, email: user.email },
        token,
    };
    }

// Request password reset (forgot password)
export async function requestPasswordReset({ email }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("User not found");
    }

    // Generate reset code
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Delete any existing reset requests for this user
    await prisma.passwordReset.deleteMany({
        where: { userId: user.id },
    });

    // Create new reset request
    await prisma.passwordReset.create({
        data: {
            userId: user.id,
            code,
            expiresAt,
        },
    });

    await sendPasswordResetEmail(user.email, user.username, code);

    return { message: "Password reset code sent to your email" };
}

// Reset password (forgot password)
export async function resetPassword({ email, code, newPassword }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("User not found");
    }

    // Find valid reset request
    const resetRequest = await prisma.passwordReset.findFirst({
        where: {
            userId: user.id,
            code,
            expiresAt: { gt: new Date() },
        },
    });

    if (!resetRequest) {
        throw new Error("Invalid or expired reset code");
    }

    // Hash new password
    const password_hash = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.user.update({
        where: { id: user.id },
        data: { password_hash },
    });

    // Clean up reset request
    await prisma.passwordReset.delete({ where: { id: resetRequest.id } });

    return { message: "Password reset successfully" };
}

// Change password (when user is logged in)
export async function changePassword({ userId, oldPassword, newPassword }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new Error("User not found");
    }

    // Verify old password
    const valid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!valid) {
        throw new Error("Invalid old password");
    }

    // Hash new password
    const password_hash = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.user.update({
        where: { id: user.id },
        data: { password_hash },
    });

    return { message: "Password changed successfully" };
}
