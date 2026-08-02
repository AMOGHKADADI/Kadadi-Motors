import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Security headers middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Health check endpoint for container monitoring
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "kadadi-motors",
      timestamp: new Date().toISOString()
    });
  });

  // Initialize Server-side Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API endpoint for PolicyFlowWizard AI recommendation
  app.post("/api/policy-advisor", async (req, res) => {
    try {
      const { userAnswers, policyType, customerProfile } = req.body;

      const systemInstruction = `You are Chandrakant Kadadi, a top independent insurance advisor in Bidar, Karnataka with 25+ years of experience at Kadadi Motors. 
Analyze the user's answers and recommend 2-3 specific, tailored insurance plans/add-ons best suited for them in Bidar/Karnataka context (e.g. Zero Dep, Engine Protect, RSA, Cashless claim at local workshops, Super Top-Up Health, Family Floater, Commercial Fleet protection, NCBs).
Provide structured output with:
1. "summary": A warm, expert 2-sentence summary addressed directly from Chandrakant Kadadi.
2. "recommendedPlans": Array of objects, each containing:
   - "title": Plan/Coverage Name (e.g., "Comprehensive Zero-Dep & Engine Protect", "Star Health Optima Restore 10L Floater", etc.)
   - "matchScore": Number (e.g. 98)
   - "keyBenefits": Array of strings (e.g., "100% Cashless Repairs at local Bidar authorized garages", "No Claim Bonus Protection up to 50%")
   - "estimatedAnnualSavings": String (e.g. "₹2,500 - ₹4,000 via NCB & multi-car discount")
   - "whyThisFits": 1-2 sentences explaining why this fits their specific answers.
3. "proTip": An insider expert advice tip from Chandrakant Kadadi for claim settlement or tax savings (e.g., Sec 80D savings or surveyor alert rule).`;

      const prompt = `User Profile & Requirements:
Insurance Category: ${policyType || 'General Insurance'}
User Profile: ${JSON.stringify(customerProfile || {})}
Interactive Questionnaire Answers: ${JSON.stringify(userAnswers || [])}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              recommendedPlans: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    matchScore: { type: Type.NUMBER },
                    keyBenefits: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    estimatedAnnualSavings: { type: Type.STRING },
                    whyThisFits: { type: Type.STRING }
                  },
                  required: ["title", "matchScore", "keyBenefits", "whyThisFits"]
                }
              },
              proTip: { type: Type.STRING }
            },
            required: ["summary", "recommendedPlans", "proTip"]
          }
        }
      });

      const text = response.text || "{}";
      const parsedData = JSON.parse(text);
      res.json({ success: true, recommendation: parsedData });
    } catch (error: any) {
      console.error("Gemini Policy Advisor Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI policy recommendation."
      });
    }
  });

  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
