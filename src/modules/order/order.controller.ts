import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { catchAsync } from "../../utils/asyncHandler";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder({
    userId: req.body.userId,
    items: req.body.items,
  });
  res.status(201).json({ success: true, data: result });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders({
    status: req.query.status as string,
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  });
  res.json({ success: true, data: result });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.updateOrderStatus(
    req.params.id,
    req.body.status
  );
  res.json({ success: true, data: result });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
};
