import { prisma } from "../../utils/prisma";
import { generateSlug } from "../../utils/slugGenerator";

export const productService = {
  // Get all products
  async getProducts() {
    return await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        variants: true,
        images: true,
      },
    });
  },

  // Get product by ID
  async getProductById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        variants: {
          include: {
            inventory: true,
          },
        },
        images: true,
      },
    });
  },

  // Get product by slug
  async getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        variants: {
          include: {
            inventory: true,
          },
        },
        images: true,
      },
    });
  },

  // Create product
  async createProduct(data: any) {
    return await prisma.product.create({
      data: {
        ...data,
        slug: data.slug || generateSlug(data.name),
      },
      include: {
        brand: true,
        category: true,
        variants: true,
        images: true,
      },
    });
  },

  // Update product
  async updateProduct(id: string, data: any) {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        slug: data.slug || (data.name ? generateSlug(data.name) : undefined),
      },
      include: {
        brand: true,
        category: true,
        variants: true,
        images: true,
      },
    });
  },

  // Delete product
  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
