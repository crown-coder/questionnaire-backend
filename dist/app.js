import express from "express";
import cors from "cors";
import surveyRoutes from "./routes/survey.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Survey API Running",
    });
});
app.use("/api/surveys", surveyRoutes);
export default app;
