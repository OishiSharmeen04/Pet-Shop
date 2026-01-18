import { Request, Response } from "express";
import { VariantService } from "./variant.service";
import { catchAsync } from "../../utils/asyncHandler";

const createVariant = catchAsync(async (req: Request, res: Response) => {
  const result = await VariantService.createVariant(req.body);
  res.status(201).json({ success: true, data: result });
});

const getAllVariants = catchAsync(async (req: Request, res: Response) => {
  const result = await VariantService.getAllVariants(req.query.productId as string);
  res.json({ success: true, data: result });
});

const getVariantById = catchAsync(async (req: Request, res: Response) => {
  const result = await VariantService.getVariantById(req.params.id);
  res.json({ success: true, data: result });
});

const updateVariant = catchAsync(async (req: Request, res: Response) => {
  const result = await VariantService.updateVariant(req.params.id, req.body);
  res.json({ success: true, data: result });
});

const deleteVariant = catchAsync(async (req: Request, res: Response) => {
  const result = await VariantService.deleteVariant(req.params.id);
  res.json({ success: true, data: result });
});

export const VariantController = {
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
};
