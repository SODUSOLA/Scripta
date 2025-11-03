// IMPORTS
//------------------------------------------------------------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import { authenticateToken } from "./middlewares/authMiddleware.js";
import sessionRoutes from "./routes/sessionRoute.js";
import authRoutes from "./routes/authRoute.js";
import draftRoutes from "./routes/POSTS/draftRoute.js";
import aiRoutes from "./routes/AI/aiRoute.js";
import aiUsageRoutes from "./routes/AI/aiUsageRoute.js"
//-----------------------------------------------------


// App setup
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "SCRIPTA API Docs",
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// ROUTES
//------------------------------------------------------------
app.get("/health", (req, res) => res.json({ status: "ok" })); // status route

// Auth routes
app.use('/api/auth', authRoutes); // auth routes

// Session routes (protected)
app.use("/api/sessions", sessionRoutes); // session management routes

// Route to get current user info (Protected route)
app.get("/api/me", authenticateToken, (req, res) => {
    return res.json({ user: req.user });
});

// Draft route
app.use("/api/drafts", draftRoutes); // User Post creation
app.use("/api/ai", aiRoutes); // AIgeneration and regeneration

// AI routes
app.use("/api/ai/usage", aiUsageRoutes); // Routeto get AI usage


// Start server
//------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
