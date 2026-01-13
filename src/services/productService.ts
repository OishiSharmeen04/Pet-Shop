import { prisma } from "../lib/prisma";

export interface CreateProductDTO {
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  categoryId: number;
  subCategoryId: number;
}

export interface UpdateProductDTO {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  stock?: number;
  sku?: string;
  categoryId?: number;
  subCategoryId?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  subCategoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
  inStock?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const productService = {
  // Get all products with advanced filtering, searching, and pagination
  async getProducts(params: PaginationParams): Promise<PaginatedResponse<any>> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Search by name or description
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
        { sku: { contains: params.search, mode: "insensitive" } },
      ];
    }

    // Filter by category
    if (params.categoryId) {
      where.categoryId = params.categoryId;
    }

    // Filter by subcategory
    if (params.subCategoryId) {
      where.subCategoryId = params.subCategoryId;
    }

    // Filter by price range
    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      where.price = {};
      if (params.minPrice !== undefined) {
        where.price.gte = params.minPrice;
      }
      if (params.maxPrice !== undefined) {
        where.price.lte = params.maxPrice;
      }
    }

    // Filter by stock availability
    if (params.inStock) {
      where.stock = { gt: 0 };
    }

    // Build order by
    const orderBy: any = {};
    const sortBy = params.sortBy || "createdAt";
    const sortOrder = params.sortOrder || "desc";
    orderBy[sortBy] = sortOrder;

    // Fetch data
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          subCategory: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    };
  },

  // Get product by ID
  async getProductById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        subCategory: true,
      },
    });
  },

  // Get product by slug
  async getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        subCategory: true,
      },
    });
  },

  // Create product
  async createProduct(data: CreateProductDTO) {
    return await prisma.product.create({
      data,
      include: {
        category: true,
        subCategory: true,
      },
    });
  },

  // Update product
  async updateProduct(id: number, data: UpdateProductDTO) {
    return await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        subCategory: true,
      },
    });
  },

  // Delete product
  async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  },

  // Get products by category
  async getProductsByCategory(categoryId: number, limit: number = 10) {
    return await prisma.product.findMany({
      where: { categoryId },
      include: {
        category: true,
        subCategory: true,
      },
      take: limit,
    });
  },

  // Get products by subcategory
  async getProductsBySubCategory(subCategoryId: number, limit: number = 10) {
    return await prisma.product.findMany({
      where: { subCategoryId },
      include: {
        category: true,
        subCategory: true,
      },
      take: limit,
    });
  },

  // Get discount products
  async getDiscountedProducts(limit: number = 10) {
    return await prisma.product.findMany({
      where: {
        discountPrice: {
          not: null,
        },
      },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  // Get products with low stock
  async getLowStockProducts(threshold: number = 5) {
    return await prisma.product.findMany({
      where: {
        stock: { lte: threshold },
      },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { stock: "asc" },
    });
  },

  // Get statistics
  async getProductStats() {
    const [totalProducts, totalValue, avgPrice, outOfStock] = await Promise.all(
      [
        prisma.product.count(),
        prisma.product.aggregate({
          _sum: { price: true },
        }),
        prisma.product.aggregate({
          _avg: { price: true },
        }),
        prisma.product.count({
          where: { stock: 0 },
        }),
      ]
    );

    return {
      totalProducts,
      totalValue: totalValue._sum.price || 0,
      avgPrice: avgPrice._avg.price || 0,
      outOfStock,
    };
  },
};
