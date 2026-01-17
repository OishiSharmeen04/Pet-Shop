//src/modules/category/category.route.ts

import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

// Category Routes
router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
//router.get("/categories/slug/:slug", CategoryController.getCategoryBySlug);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
