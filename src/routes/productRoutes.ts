import { Router } from "express";
import { productController } from "../controllers/productController";

const router = Router();

// Product Routes with advanced features
router.get("/products", productController.getProducts);
router.get("/products/stats", productController.getProductStats);
router.get("/products/discounted", productController.getDiscountedProducts);
router.get("/products/low-stock", productController.getLowStockProducts);
router.get("/products/slug/:slug", productController.getProductBySlug);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Products by category/subcategory
router.get(
  "/categories/:categoryId/products",
  productController.getProductsByCategory
);
router.get(
  "/sub-categories/:subCategoryId/products",
  productController.getProductsBySubCategory
);

export default router;
