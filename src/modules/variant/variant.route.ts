import { Router } from "express";
import { VariantController } from "./variant.controller";

const router = Router();

router.post("/", VariantController.createVariant);
router.get("/", VariantController.getAllVariants);
router.get("/:id", VariantController.getVariantById);
router.patch("/:id", VariantController.updateVariant);
router.delete("/:id", VariantController.deleteVariant);

export default router;
