import { db } from "../db.js";
import { surveyResponses } from "../schema.js";
import { eq } from "drizzle-orm";

const INT_FIELDS = [
  "challengeDocuments",
  "challengeDeadlines",
  "challengeClientCommunication",
  "challengeCaseTracking",
  "challengeComplianceTracking",
  "challengeBilling",
  "featureMatterManagement",
  "featureDocumentManagement",
  "featureReminders",
  "featureClientPortal",
  "featureTaskManagement",
  "featureBilling",
  "featureComplianceTracking",
  "featureAiSearch",
  "litigationPercentage",
  "corporatePercentage",
  "compliancePercentage",
  "taxPercentage",
  "companySecretarialPercentage",
];

export const sanitizeSurveyData = (data: any) => {
  const out: any = { ...data };

  // Convert empty strings to null and coerce integer fields
  for (const key of INT_FIELDS) {
    const val = out[key];
    if (val === "" || val === undefined) {
      out[key] = null;
    } else if (val === null) {
      out[key] = null;
    } else {
      const n = Number(val);
      out[key] = Number.isFinite(n) ? n : null;
    }
  }

  // Ensure arrays are either null or arrays
  if (Array.isArray(out.practiceAreas) && out.practiceAreas.length === 0) {
    out.practiceAreas = null;
  }

  if (Array.isArray(out.currentTools) && out.currentTools.length === 0) {
    out.currentTools = null;
  }

  // Remove any id/createdAt from client payload
  delete out.id;
  delete out.createdAt;

  return out;
};

export const createSurveyResponse = async (data: any) => {
  const sanitized = sanitizeSurveyData(data);

  try {
    const [response] = await db
      .insert(surveyResponses)
      .values(sanitized)
      .returning();

    return response;
  } catch (err) {
    console.error("DB insert error:", err);
    throw err;
  }
};

export const getAllSurveyResponses = async () => {
  return await db.select().from(surveyResponses);
};

export const getSurveyResponseById = async (id: number) => {
  const responses = await db
    .select()
    .from(surveyResponses)
    .where(eq(surveyResponses.id, id));

  return responses[0] || null;
};
