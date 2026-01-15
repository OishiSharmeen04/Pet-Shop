import { Request, Response } from "express";
import { categoryService } from "./category.service"

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
      const category = await categoryService.getCategoryById(id);

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

  // Get category by slug
  async getCategoryBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const category = await categoryService.getCategoryBySlug(slug);

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
      const { name, slug, type, parentId, icon } = req.body;

      if (!name || !type) {
        return res.status(400).json({
          success: false,
          error: "Name and type are required",
        });
      }

      const category = await categoryService.createCategory({
        name,
        slug,
        type,
        parentId,
        icon,
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
      const updateData = req.body;

      const category = await categoryService.updateCategory(
        id,
        updateData
      );

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

      await categoryService.deleteCategory(id);

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
