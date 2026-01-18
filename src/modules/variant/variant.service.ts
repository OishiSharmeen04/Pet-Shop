import { prisma } from "../../utils/prisma";

const createVariant = async (payload: {
  productId: string;
  sku: string;
  price: number;
  stock?: number;
  isDefault?: boolean;
}) => {
  return prisma.productVariant.create({
    data: {
      productId: payload.productId,
      sku: payload.sku,
      price: payload.price,
      stock: payload.stock,
      isDefault: payload.isDefault ?? false,
    },
    include: {
      product: true,
      inventory: true,
    },
  });
};

const getVariantById = async (id: string) => {
  return prisma.productVariant.findUnique({
    where: { id },
    include: {
      product: true,
      inventory: true,
      orderItems: true,
    },
  });
};

const getAllVariants = async (productId?: string) => {
  return prisma.productVariant.findMany({
    where: productId ? { productId } : {},
    include: {
      product: true,
      inventory: true,
    },
  });
};

const updateVariant = async (
  id: string,
  payload: {
    sku?: string;
    price?: number;
    stock?: number;
    isDefault?: boolean;
  }
) => {
  return prisma.productVariant.update({
    where: { id },
    data: payload,
    include: {
      product: true,
      inventory: true,
    },
  });
};

const deleteVariant = async (id: string) => {
  return prisma.productVariant.delete({
    where: { id },
  });
};

export const VariantService = {
  createVariant,
  getVariantById,
  getAllVariants,
  updateVariant,
  deleteVariant,
};
 