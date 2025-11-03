// Validate registration 
export function validateRegister(req, res, next) {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    next();
    }

// Validate login
export function validateLogin(req, res, next) {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        return res.status(400).json({ error: "Both identifier and password are required" });
    }
    next();
    }
