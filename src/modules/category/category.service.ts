import { CategoryType } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { generateSlug } from "../../utils/slugGenerator";

const createCategory = async (payload: {
  name: string;
  type: CategoryType;
  parentId?: string;
}) => {
  const slug = generateSlug(payload.name);

  return prisma.category.create({
    data: {
      name: payload.name,
      type: payload.type,
      slug,
      parentId: payload.parentId || null,
    },
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      children: true,
    },
  });
};

const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
    include: {
      products: true,
      children: true,
    },
  });
};

const updateCategory = async (
  id: string, 
  payload: { 
    name?: string;
    type?: CategoryType;
    parentId?: string;
   }) => {
  const data: any = {};

  if (payload.name) {
    data.name = payload.name;
    data.slug = generateSlug(payload.name);
  }

  if (payload.type) {
    data.type = payload.type;
  }

  if (payload.parentId !== undefined) {
    data.parentId = payload.parentId;
  }

  return prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
