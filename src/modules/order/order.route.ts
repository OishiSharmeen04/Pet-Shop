import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.patch("/:id/status", OrderController.updateOrderStatus);

export default router;
