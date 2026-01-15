import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

// Category Routes
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.get("/categories/slug/:slug", categoryController.getCategoryBySlug);
router.post("/categories", categoryController.createCategory);
router.patch("/categories/:id", categoryController.updateCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

export default router;
