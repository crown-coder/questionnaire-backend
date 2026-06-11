import { Router } from "express";
import {
  submitSurvey,
  getSurveys,
  getSurvey,
} from "../controllers/survey.controller.js";

const router = Router();

router.post("/", submitSurvey);

router.get("/", getSurveys);

router.get("/:id", getSurvey);

export default router;
