import { Router } from "express";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
  updateLeadStatus,
} from "../controllers/leadController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validate } from "../middlewares/validate.js";
import {
  createLeadSchema,
  updateLeadSchema,
  updateLeadStatusSchema,
} from "../validators/leadValidator.js";

const router = Router();

router.use(protect);

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", upload.single("attachment"), validate(createLeadSchema), createLead);
router.put("/:id", upload.single("attachment"), validate(updateLeadSchema), updateLead);
router.delete("/:id", deleteLead);
router.patch("/:id/status", validate(updateLeadStatusSchema), updateLeadStatus);

export default router;
