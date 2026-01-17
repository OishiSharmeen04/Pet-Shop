import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

// Product Routes
router.get("/products", productController.getProducts);
router.get("/products/slug/:slug", productController.getProductBySlug);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;