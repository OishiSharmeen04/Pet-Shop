import { prisma } from "../../../utils/prisma";
import { generateSlug } from "../../../utils/slugGenerator";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  CreateSubCategoryDTO,
  UpdateSubCategoryDTO,
  CategoryResponse,
} from "../types/index";

// Category Services
export const categoryService = {
  // Get all categories
  async getAllCategories(): Promise<CategoryResponse[]> {
    return await prisma.category.findMany();
  },

  // Get category by ID
  async getCategoryById(id: string): Promise<CategoryResponse | null> {
    return await prisma.category.findUnique({
      where: { id },
    });
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<CategoryResponse | null> {
    return await prisma.category.findUnique({
      where: { slug },
    });
  },

  // Create category
  async createCategory(data: CreateCategoryDTO) {
    return await prisma.category.create({
      data: {
        ...data,
        slug: data.slug || generateSlug(data.name),
      },
    });
  },

  // Update category
  async updateCategory(id: string, data: UpdateCategoryDTO) {
    return await prisma.category.update({
      where: { id },
      data: {
        ...data,
        slug: data.slug || (data.name ? generateSlug(data.name) : undefined),
      },
    });
  },

  // Delete category
  async deleteCategory(id: string) {
    return await prisma.category.delete({
      where: { id },
    });
  },
};

// SubCategory Services
export const subCategoryService = {
  // Get all sub-categories
  async getAllSubCategories() {
    return await prisma.subCategory.findMany({
      include: {
        category: true,
      },
    });
  },

  // Get sub-category by ID
  async getSubCategoryById(id: number) {
    return await prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  },

  // Get sub-categories by category ID
  async getSubCategoriesByCategoryId(categoryId: number) {
    return await prisma.subCategory.findMany({
      where: { categoryId },
      include: {
        category: true,
      },
    });
  },

  // Get sub-category by slug
  async getSubCategoryBySlug(slug: string) {
    return await prisma.subCategory.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });
  },

  // Create sub-category
  async createSubCategory(data: CreateSubCategoryDTO) {
    return await prisma.subCategory.create({
      data,
      include: {
        category: true,
      },
    });
  },

  // Update sub-category
  async updateSubCategory(id: number, data: UpdateSubCategoryDTO) {
    return await prisma.subCategory.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  },

  // Delete sub-category
  async deleteSubCategory(id: number) {
    return await prisma.subCategory.delete({
      where: { id },
    });
  },
};
