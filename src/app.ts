// src/app.ts
import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req, res) => {
  res.json({
    message: "Pet Shop API is running!",
    version: "1.0.0",
    endpoints: {
      health: "/",
      categories: "/api/categories",
      products: "/api/products",
    },
  });
});

// Category Routes
app.use("/api", categoryRoutes);

// Product Routes
app.use("/api", productRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    availableRoutes: [
      "GET /",
      "GET /api/categories",
      "POST /api/categories",
      "GET /api/categories/:id",
      "PUT /api/categories/:id",
      "DELETE /api/categories/:id",
      "GET /api/products",
      "POST /api/products",
      "GET /api/products/:id",
      "PUT /api/products/:id",
      "DELETE /api/products/:id",
    ],
  });
});

// Error handler
app.use((error: any, _req: any, res: any, _next: any) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

export default app;
