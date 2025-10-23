import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Email transporter config
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
    rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
});


// Send welcome email to new users
export async function sendWelcomeEmail(email, username) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Welcome to Scripta",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border-radius:10px;border:1px solid #eee;">
            <h2 style="color:#2b2d42;">Hi ${username},</h2>
            <p>Welcome to <b>Scripta</b> — your social media writing assistant!</p>
            <p>We’re thrilled to have you on board.</p>
            <p style="margin-top:20px;">You can now log in and start creating your first post.</p>
            <hr style="margin-top:30px;"/>
            <p style="font-size:12px;color:#888;">This email was sent automatically. Please don’t reply.</p>
        </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}: ${info.messageId}`);
    } catch (err) {
        console.error("Email sending failed:", err.message);
    }
}

// Notify user of new login
export async function sendLoginNotification(email, username) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "New Login to Your Scripta Account",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border-radius:10px;border:1px solid #eee;">
            <h3>Hey ${username},</h3>
            <p>We noticed a new login to your Scripta account.</p>
            <p>If this was you — great! If not, please reset your password immediately.</p>
            <p style="color:#555;">Time: ${new Date().toLocaleString()}</p>
            <hr/>
            <p style="font-size:12px;color:#888;">This email was sent automatically. Please don’t reply.</p>
        </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Login alert sent to ${email}: ${info.messageId}`);
    } catch (err) {
        console.error("Login email failed:", err.message);
    }
}

// Send login verification code for new devices
export async function sendLoginVerificationCode(email, username, code, ip, userAgent) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Verify your login to Scripta",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border-radius:10px;border:1px solid #eee;">
            <h3>Hi ${username},</h3>
            <p>We detected a login attempt from a new device.</p>
            <p><b>IP Address:</b> ${ip || "unknown"}<br/>
            <b>Device:</b> ${userAgent || "unknown"}</p>
            <p>Please verify this login by entering the code below:</p>
            <h2 style="text-align:center;letter-spacing:4px;">${code}</h2>
            <p>This code will expire in 10 minutes.</p>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${email}`);
    } catch (err) {
        console.error("Failed to send verification code:", err.message);
    }
}

// Send password reset code
export async function sendPasswordResetEmail(email, username, code) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Reset your Scripta password",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border-radius:10px;border:1px solid #eee;">
            <h3>Hi ${username},</h3>
            <p>You requested a password reset for your Scripta account.</p>
            <p>Please use the code below to reset your password:</p>
            <h2 style="text-align:center;letter-spacing:4px;">${code}</h2>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr/>
            <p style="font-size:12px;color:#888;">This email was sent automatically. Please don’t reply.</p>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset code sent to ${email}`);
    } catch (err) {
        console.error("Failed to send password reset code:", err.message);
    }
}
