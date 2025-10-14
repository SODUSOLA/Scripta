import { registerUser, loginUser, verifyLogin } from "../services/authService.js";

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const result = await registerUser({ username, email, password });
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