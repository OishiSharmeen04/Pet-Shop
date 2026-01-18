import { Router } from "express";
import categoryRouter from "../modules/category/category.route";
import productRouter from "../modules/product/product.route";
import userRouter from "../modules/user/user.route";
import orderRouter from "../modules/order/order.route";
import variantRouter from "../modules/variant/variant.route";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/variants", variantRouter);

export default router;
