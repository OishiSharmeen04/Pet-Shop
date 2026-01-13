import { Router } from "express";
import {
  categoryController,
  subCategoryController,
} from "../controllers/categoryController";

const router = Router();

// Category Routes
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.post("/categories", categoryController.createCategory);
router.patch("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

// SubCategory Routes
router.get("/sub-categories", subCategoryController.getAllSubCategories);
router.get("/sub-categories/:id", subCategoryController.getSubCategoryById);
router.get(
  "/categories/:categoryId/sub-categories",
  subCategoryController.getSubCategoriesByCategoryId
);
router.post("/sub-categories", subCategoryController.createSubCategory);
router.patch("/sub-categories/:id", subCategoryController.updateSubCategory);
router.delete("/sub-categories/:id", subCategoryController.deleteSubCategory);

export default router;
