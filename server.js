// IMPORTS
//------------------------------------------------------------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load env variables
dotenv.config();

import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import { register, login } from "./controllers/authController.js";
import { validateRegister, validateLogin } from "./middlewares/validate.js";
//------------------------------------------------------------

// App setup
const app = express();
const PORT = process.env.PORT || 4000;

// Swagger setup
const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "SCRIPTA API Docs",
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));    

// Route to get current user info (Protected route)
app.get("/api/me", (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Missing token" });

    const token = auth.split("")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ user: decoded });
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
});

// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES
//------------------------------------------------------------
app.get("/health", (req, res) => res.json({ status: "ok" })); // status route

// Auth routes
app.post("/api/auth/register", validateRegister, register); // registration route
app.post("/api/auth/login", validateLogin, login); // login route

//------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
