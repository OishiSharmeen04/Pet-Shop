import { prisma } from "../../utils/prisma";
import { Role } from "@prisma/client";

const createUser = async (payload: {
  name?: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role || Role.USER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      // Exclude password from response
    },
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
          status: true,
          total: true,
          createdAt: true,
        },
      },
    },
  });
};

const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

const updateUser = async (
  id: string,
  payload: {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
  }
) => {
  const data: any = {};

  if (payload.name !== undefined) {
    data.name = payload.name;
  }

  if (payload.email) {
    data.email = payload.email;
  }

  if (payload.password) {
    data.password = payload.password;
  }

  if (payload.role) {
    data.role = payload.role;
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const getUserOrders = async (id: string) => {
  return prisma.order.findMany({
    where: { userId: id },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserOrders,
};