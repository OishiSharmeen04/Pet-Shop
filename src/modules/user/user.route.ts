import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

// User Routes
router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/email/:email", UserController.getUserByEmail); // BEFORE /:id
router.get("/:id", UserController.getUserById);
router.get("/:id/orders", UserController.getUserOrders);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;