import { Category, SubCategory } from "@prisma/client";

export interface CreateCategoryDTO {
  name: string;
  slug: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
}

export interface CategoryResponse extends Category {
  subCategories?: SubCategory[];
}

export interface CreateSubCategoryDTO {
  name: string;
  slug: string;
  categoryId: number;
}

export interface UpdateSubCategoryDTO {
  name?: string;
  slug?: string;
  categoryId?: number;
}
