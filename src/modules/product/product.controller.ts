import { Request, Response } from "express";
import { productService } from "./product.service";

export const productController = {
  // Get all products
  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      res.json({
        success: true,
        data: products,
      });
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch products",
        details: error?.message,
      });
    }
  },

  // Get product by ID
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch product",
      });
    }
  },

  // Get product by slug
  async getProductBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const product = await productService.getProductBySlug(slug);

      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch product",
      });
    }
  },

  // Create product
  async createProduct(req: Request, res: Response) {
    try {
      const {
        name,
        slug,
        description,
        brandId,
        categoryId,
        ageMin,
        ageMax,
        basePrice,
        isFeatured,
        status,
      } = req.body;

      if (!name || !basePrice) {
        return res.status(400).json({
          success: false,
          error: "Name and basePrice are required",
        });
      }

      const product = await productService.createProduct({
        name,
        slug,
        description,
        brandId,
        categoryId,
        ageMin,
        ageMax,
        basePrice,
        isFeatured,
        status,
      });

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          error: "Product with this slug already exists",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to create product",
      });
    }
  },

  // Update product
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const product = await productService.updateProduct(
        id,
        updateData
      );

      res.json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to update product",
      });
    }
  },

  // Delete product
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);

      res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to delete product",
      });
    }
  },
};
