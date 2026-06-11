import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
export const surveyResponses = pgTable("survey_responses", {
    id: serial("id").primaryKey(),
    // Personal Information
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    lawFirm: text("law_firm"),
    position: text("position"),
    yearsOfPractice: text("years_of_practice"),
    firmSize: text("firm_size"),
    // Practice Areas
    practiceAreas: text("practice_areas").array(),
    // Current Workflow
    currentTools: text("current_tools").array(),
    documentStorage: text("document_storage"),
    workflowDescription: text("workflow_description"),
    // Challenges (1-5 ratings)
    challengeDocuments: integer("challenge_documents"),
    challengeDeadlines: integer("challenge_deadlines"),
    challengeClientCommunication: integer("challenge_client_communication"),
    challengeCaseTracking: integer("challenge_case_tracking"),
    challengeComplianceTracking: integer("challenge_compliance_tracking"),
    challengeBilling: integer("challenge_billing"),
    biggestChallenge: text("biggest_challenge"),
    // Feature Validation
    featureMatterManagement: integer("feature_matter_management"),
    featureDocumentManagement: integer("feature_document_management"),
    featureReminders: integer("feature_reminders"),
    featureClientPortal: integer("feature_client_portal"),
    featureTaskManagement: integer("feature_task_management"),
    featureBilling: integer("feature_billing"),
    featureComplianceTracking: integer("feature_compliance_tracking"),
    featureAiSearch: integer("feature_ai_search"),
    // Practice Breakdown
    litigationPercentage: integer("litigation_percentage"),
    corporatePercentage: integer("corporate_percentage"),
    compliancePercentage: integer("compliance_percentage"),
    taxPercentage: integer("tax_percentage"),
    companySecretarialPercentage: integer("company_secretarial_percentage"),
    // Product Interest
    interestedInPilot: text("interested_in_pilot"),
    willingToPay: text("willing_to_pay"),
    contactForPrototype: text("contact_for_prototype"),
    // Open Questions
    magicWandProblem: text("magic_wand_problem"),
    additionalComments: text("additional_comments"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
