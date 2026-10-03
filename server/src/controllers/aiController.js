const ai = require("../config/gemini");
const AIUsageModel = require("../models/aiUsageModel");
const { isValid } = require("../utils/validators");

const askAI = async (req, res) => {
    try {
        let userId = req.userId;
        const { question } = req.body;

        if (!isValid(question)) {
            return res.status(400).json({ msg: "Question is Required" });
        }

        if (question.trim().length > 1000) {
            return res.status(400).json({ msg: "Question is too long" })
        }

        let usage = await AIUsageModel.findOne({ userId });

        const today = new Date();

        if (!usage) {
            usage = await AIUsageModel.create({
                userId,
                requestCount: 0,
                lastRequestDate: today
            });
        }

        if (!usage.lastRequestDate || usage.lastRequestDate.toDateString() !== today.toDateString()) {
            usage.requestCount = 0;
            usage.lastRequestDate = today;
        }

        const DAILY_LIMIT = 10;

        if (usage.requestCount >= DAILY_LIMIT) {
            return res.status(429).json({ msg: "Daily AI usage limit reached. Try again tomorrow." });
        };

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            config: {
                systemInstruction: `You are the AI assistant for a college information website.

                Your purpose is to help authenticated students with:
                - College-related information
                - Jiwaji University-related information
                - College procedures
                - Admission information
                - Examination information
                - Courses and subjects
                - Teachers and departments
                - College notices
                - University/college documents
                - Explaining information contained in official college documents

                Only answer questions related to the college, Jiwaji University,
                college procedures, university procedures, or documents relevant to
                students.

                If a user asks something unrelated, politely respond:
                "I can only assist with college, Jiwaji University, and related
                document questions."

                Do not intentionally answer unrelated general-purpose questions.
                Do not pretend to know official college information when it has not
                been provided or verified.`,

                temperature: 0.2
            },

            contents: question.trim()
        });

        const answer = response.text;

        usage.requestCount += 1;
        usage.lastRequestDate = today;

        await usage.save();

        return res.status(200).json({ msg: "Ai Response Generated Successfully", answer })

    } catch (error) {
        console.log(error);
        if (error.status === 503) {
            return res.status(503).json({
                msg: "AI service is temporarily busy. Please try again in a moment."
            });
        }
        return res.status(500).json({ msg: "Internal Server Error On AI Side" })
    }
}

module.exports = { askAI };