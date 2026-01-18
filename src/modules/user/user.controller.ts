import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/asyncHandler";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  res.json({
    success: true,
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id);
  res.json({
    success: true,
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserByEmail(req.params.email);
  res.json({
    success: true,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  res.json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  res.json({
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserOrders(req.params.id);
  res.json({
    success: true,
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserOrders,
};