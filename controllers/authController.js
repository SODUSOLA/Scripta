import { registerUser, loginUser, verifyLogin, requestPasswordReset, resetPassword, changePassword } from "../services/authService.js";

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        // Capture user device info
    const ip =
        req.headers["x-forwarded-for"]?.split(",").shift() ||
        req.socket?.remoteAddress ||
        req.connection?.remoteAddress ||
        "unknown";

    const userAgent = req.headers["user-agent"] || "unknown";

        const result = await registerUser({ username, email, password , ip, userAgent });
        return res.status(201).json(result);
    } catch (err) {
        console.error("Register error:", err.message);
        return res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const { identifier, password } = req.body;

        // Grab IP + user-agent
        const ip =
        req.headers["x-forwarded-for"]?.split(",").shift() ||
        req.socket?.remoteAddress ||
        req.connection?.remoteAddress ||
        "unknown";

        const userAgent = req.headers["user-agent"] || "unknown";

        // Pass them correctly to the service
        const result = await loginUser({ identifier, password, ip, userAgent });

        return res.status(200).json(result);
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(400).json({ error: err.message });
    }
}

// Verify login with code
export async function verifyLoginCode(req, res) {
    try {
        const { email, code } = req.body;
        const result = await verifyLogin({ email, code });
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Request password reset
export async function requestReset(req, res) {
    try {
        const { email } = req.body;
        const result = await requestPasswordReset({ email });
        return res.status(200).json(result);
    } catch (err) {
        console.error("Request reset error:", err.message);
        return res.status(400).json({ error: err.message });
    }
}

// Reset password
export async function resetPasswordController(req, res) {
    try {
        const { email, code, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            throw new Error("Passwords must match");
        }
        const result = await resetPassword({ email, code, newPassword });
        return res.status(200).json(result);
    } catch (err) {
        console.error("Reset password error:", err.message);
        return res.status(400).json({ error: err.message });
    }
}

// Change password (requires authentication)
export async function changePasswordController(req, res) {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            throw new Error("Passwords must match");
        }
        const userId = req.user.id; // Assuming auth middleware sets req.user
        const result = await changePassword({ userId, oldPassword, newPassword });
        return res.status(200).json(result);
    } catch (err) {
        console.error("Change password error:", err.message);
        return res.status(400).json({ error: err.message });
    }
}
