import { Request, Response } from "express";
import * as surveyService from "../services/survey.service.js";

export const submitSurvey = async (req: Request, res: Response) => {
  try {
    // Debugging helper: if client sends header x-debug=1 return sanitized payload
    if (req.headers["x-debug"] === "1") {
      const sanitized = surveyService.sanitizeSurveyData(req.body);
      return res.status(200).json({ success: true, sanitized });
    }

    const response = await surveyService.createSurveyResponse(req.body);

    return res.status(201).json({
      success: true,
      message: "Survey submitted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Survey submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit survey",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSurveys = async (req: Request, res: Response) => {
  try {
    const responses = await surveyService.getAllSurveyResponses();

    return res.status(200).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch surveys",
    });
  }
};

export const getSurvey = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const response = await surveyService.getSurveyResponseById(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Survey not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch survey",
    });
  }
};
