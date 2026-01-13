import { Request, Response } from "express";
import { productService, PaginationParams } from "../services/productService";

export const productController = {
  // Get all products with filtering, searching, and pagination
  async getProducts(req: Request, res: Response) {
    try {
      const params: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        search: req.query.search as string,
        categoryId: req.query.categoryId
          ? parseInt(req.query.categoryId as string)
          : undefined,
        subCategoryId: req.query.subCategoryId
          ? parseInt(req.query.subCategoryId as string)
          : undefined,
        minPrice: req.query.minPrice
          ? parseFloat(req.query.minPrice as string)
          : undefined,
        maxPrice: req.query.maxPrice
          ? parseFloat(req.query.maxPrice as string)
          : undefined,
        sortBy:
          (req.query.sortBy as "name" | "price" | "createdAt") || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        inStock: req.query.inStock === "true",
      };

      const result = await productService.getProducts(params);
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch products",
      });
    }
  },

  // Get product by ID
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(parseInt(id));

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
        price,
        discountPrice,
        stock,
        sku,
        categoryId,
        subCategoryId,
      } = req.body;

      if (!name || !slug || !price || !sku || !categoryId || !subCategoryId) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      const product = await productService.createProduct({
        name,
        slug,
        description,
        price,
        discountPrice,
        stock: stock || 0,
        sku,
        categoryId,
        subCategoryId,
      });

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          error: "Product with this name, slug, or SKU already exists",
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
        parseInt(id),
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
      await productService.deleteProduct(parseInt(id));

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

  // Get products by category
  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const products = await productService.getProductsByCategory(
        parseInt(categoryId),
        limit
      );

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch products",
      });
    }
  },

  // Get products by subcategory
  async getProductsBySubCategory(req: Request, res: Response) {
    try {
      const { subCategoryId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const products = await productService.getProductsBySubCategory(
        parseInt(subCategoryId),
        limit
      );

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch products",
      });
    }
  },

  // Get discounted products
  async getDiscountedProducts(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const products = await productService.getDiscountedProducts(limit);

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch discounted products",
      });
    }
  },

  // Get low stock products
  async getLowStockProducts(req: Request, res: Response) {
    try {
      const threshold = req.query.threshold
        ? parseInt(req.query.threshold as string)
        : 5;

      const products = await productService.getLowStockProducts(threshold);

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch low stock products",
      });
    }
  },

  // Get product statistics
  async getProductStats(req: Request, res: Response) {
    try {
      const stats = await productService.getProductStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch product statistics",
      });
    }
  },
};
