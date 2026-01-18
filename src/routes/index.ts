import { Router } from "express";
import categoryRouter from "../modules/category/category.route";
import productRouter from "../modules/product/product.route";
import userRouter from "../modules/user/user.route"

const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
