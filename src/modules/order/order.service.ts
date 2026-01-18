import { prisma } from "../../utils/prisma";

const createOrder = async (payload: {
  userId?: string;
  items: {
    variantId: string;
    quantity: number;
    price: number;
  }[];
}) => {
  // calculate total
  const totalAmount = payload.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return prisma.order.create({
    data: {
      userId: payload.userId || null,
      total: totalAmount,
      items: {
        create: payload.items,
      },
    },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true,
              inventory: true,
            },
          },
        },
      },
      user: true,
    },
  });
};

const getAllOrders = async (query?: { status?: string; page?: number; limit?: number }) => {
  const { status, page = 1, limit = 10 } = query || {};
  const skip = (page - 1) * limit;

  return prisma.order.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true,
              inventory: true,
            },
          },
        },
      },
      user: true,
    },
  });
};

const updateOrderStatus = async (
  id: string,
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) => {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
};
