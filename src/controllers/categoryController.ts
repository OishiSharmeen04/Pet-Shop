import { Request, Response } from "express";
import {
  categoryService,
  subCategoryService,
} from "../services/categoryService";

// Category Controllers
export const categoryController = {
  // Get all categories
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch categories",
      });
    }
  },

  // Get category by ID
  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(parseInt(id));

      if (!category) {
        return res.status(404).json({
          success: false,
          error: "Category not found",
        });
      }

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch category",
      });
    }
  },

  // Create category
  async createCategory(req: Request, res: Response) {
    try {
      const { name, slug } = req.body;

      if (!name || !slug) {
        return res.status(400).json({
          success: false,
          error: "Name and slug are required",
        });
      }

      const category = await categoryService.createCategory({
        name,
        slug,
      });

      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          error: "Category with this name or slug already exists",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to create category",
      });
    }
  },

  // Update category
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, slug } = req.body;

      const category = await categoryService.updateCategory(parseInt(id), {
        name,
        slug,
      });

      res.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Category not found",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to update category",
      });
    }
  },

  // Delete category
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await categoryService.deleteCategory(parseInt(id));

      res.json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Category not found",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to delete category",
      });
    }
  },
};

// SubCategory Controllers
export const subCategoryController = {
  // Get all sub-categories
  async getAllSubCategories(req: Request, res: Response) {
    try {
      const subCategories = await subCategoryService.getAllSubCategories();
      res.json({
        success: true,
        data: subCategories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch sub-categories",
      });
    }
  },

  // Get sub-category by ID
  async getSubCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const subCategory = await subCategoryService.getSubCategoryById(
        parseInt(id)
      );

      if (!subCategory) {
        return res.status(404).json({
          success: false,
          error: "SubCategory not found",
        });
      }

      res.json({
        success: true,
        data: subCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch sub-category",
      });
    }
  },

  // Get sub-categories by category ID
  async getSubCategoriesByCategoryId(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const subCategories =
        await subCategoryService.getSubCategoriesByCategoryId(
          parseInt(categoryId)
        );

      res.json({
        success: true,
        data: subCategories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch sub-categories",
      });
    }
  },

  // Create sub-category
  async createSubCategory(req: Request, res: Response) {
    try {
      const { name, slug, categoryId } = req.body;

      if (!name || !slug || !categoryId) {
        return res.status(400).json({
          success: false,
          error: "Name, slug, and categoryId are required",
        });
      }

      const subCategory = await subCategoryService.createSubCategory({
        name,
        slug,
        categoryId,
      });

      res.status(201).json({
        success: true,
        data: subCategory,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          error: "SubCategory with this slug already exists",
        });
      }
      if (error.code === "P2003") {
        return res.status(400).json({
          success: false,
          error: "Category does not exist",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to create sub-category",
      });
    }
  },

  // Update sub-category
  async updateSubCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, slug, categoryId } = req.body;

      const subCategory = await subCategoryService.updateSubCategory(
        parseInt(id),
        {
          name,
          slug,
          categoryId,
        }
      );

      res.json({
        success: true,
        data: subCategory,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "SubCategory not found",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to update sub-category",
      });
    }
  },

  // Delete sub-category
  async deleteSubCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await subCategoryService.deleteSubCategory(parseInt(id));

      res.json({
        success: true,
        message: "SubCategory deleted successfully",
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "SubCategory not found",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to delete sub-category",
      });
    }
  },
};
