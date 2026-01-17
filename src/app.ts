import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { applyGlobalMiddleware, globalErrorHandler } from "./middlewares";

dotenv.config();

const app: Application = express();

// Middleware
applyGlobalMiddleware(app);

// All API routes
app.use("/api/v1", routes);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// Error handler
app.use(globalErrorHandler);

export default app;
