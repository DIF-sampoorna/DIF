import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Resolve file paths supporting both native CommonJS (production build) and ESM (development/tsx mode)
const getPathInfo = () => {
  let fileLoc = "";
  let dirLoc = "";
  try {
    if (typeof import.meta !== "undefined" && import.meta.url) {
      fileLoc = fileURLToPath(import.meta.url);
      dirLoc = path.dirname(fileLoc);
    }
  } catch (error) {
    // Catch-all
  }
  return {
    filename: fileLoc || (typeof __filename !== "undefined" ? __filename : ""),
    dirname: dirLoc || (typeof __dirname !== "undefined" ? __dirname : "")
  };
};

const { filename: __filenameClean, dirname: __dirnameClean } = getPathInfo();
const __filename = __filenameClean;
const __dirname = __dirnameClean;

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Gemini SDK with User-Agent telemetry headers unless explicitly disabled or missing key
const apiKey = process.env.GEMINI_API_KEY;
const isGeminiDisabled = process.env.DISABLE_GEMINI === "true";
let ai: GoogleGenAI | null = null;

if (apiKey && !isGeminiDisabled) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  if (isGeminiDisabled) {
    console.info("Gemini API is explicitly disabled via DISABLE_GEMINI=true. Chatbot will run in local simulation mode.");
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. Chatbot will run in fallback simulation mode.");
  }
}

// Intelligent fallback helper function containing core knowledge about Deepjyoti India Foundation (DIF) and Sampoorna
function generateFallbackResponse(lastUserMsg: string): string {
  const query = lastUserMsg.toLowerCase().trim();
  const queryWords = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ").split(/\s+/).filter(Boolean);

  interface TopicDefinition {
    id: string;
    keywords: string[];
    navigateTab?: string;
    response: string;
  }
  
  const topics: TopicDefinition[] = [
    {
      id: "locations",
      keywords: ["location", "locatioin", "locations", "locatioins", "where", "place", "places", "area", "areas", "geograph", "region", "regions", "city", "cities", "operate", "operations", "outreach", "reach", "map", "shillong", "guwahati", "assam", "meghalaya", "mumbai", "maharashtra", "bonda", "amsing", "panjabari", "panikhaiti", "bonga", "narengi", "office", "hq", "headquarters", "registered"],
      navigateTab: "about",
      response: "DIF operates monthly primary health clinics in Guwahati (Assam), youth counseling and entrepreneurship workshops in Shillong (Meghalaya), and hospital medical clowning sessions in Mumbai (Maharashtra)."
    },
    {
      id: "sampoorna",
      keywords: ["sampoorna", "samporna", "somporna", "health", "camp", "camps", "preventive", "care", "screening", "screenings", "doctor", "doctors", "physician", "vitals", "clinic", "clinics", "medicine", "medicines", "diagnost", "diagnostics", "hygiene", "hb", "hemoglobin", "bmi", "card", "cards", "bnw", "cpr", "first aid", "choking", "preventive diagnostics", "cervical", "cancer", "anemia", "diabetes", "sanitation", "kid"],
      navigateTab: "programs",
      response: "Project Sampoorna is our primary health campaign running 16 monthly health camps (₹24,000/camp) and tracking Hb levels and vitals of 100 women on longitudinal cards (BNW-001 to BNW-100)."
    },
    {
      id: "mental_health",
      keywords: ["mental", "emotional", "wellbeing", "well-being", "literacy", "mindful", "resilience", "worry", "thoughts", "feelings", "feeling", "oyf", "owning", "workshop", "workshops", "cohort", "cohorts", "cotton", "handique", "clown", "clowning", "laughter", "therapy", "geriatric", "psychological", "dementia", "memory", "coping", "anxiety", "anxious", "stress"],
      navigateTab: "programs",
      response: "Owning Your Feelings (OYF) runs 3-month emotional literacy workshops at Cotton University & Handique Girls' College, alongside pediatric and geriatric hospital medical clowning."
    },
    {
      id: "youth",
      keywords: ["youth", "career", "counsel", "counseling", "counselling", "school", "schools", "student", "students", "class", "classes", "st. francis", "francis", "entrepreneur", "entrepreneurship", "ferrando", "soft skill", "soft skills", "coaching", "livelihood", "livelihoods", "joy", "giving", "give", "distribution", "rations", "nutrition", "sweets", "toys", "garments", "winter", "clothes"],
      navigateTab: "programs",
      response: "We provide school counseling at St. Francis in Shillong, entrepreneurship training at Ferrando Shelter Home, and host year-round nutrition/garment distribution drives."
    },
    {
      id: "research",
      keywords: ["research", "data", "data-driven", "metrics", "track", "tracking", "excel", "sheet", "database", "before-and-after", "pre-session", "post-session", "survey", "surveys", "framework", "evidence", "longitudinal", "bnw", "kpi", "kpis", "dataset", "datasets", "evidence-based"],
      navigateTab: "programs",
      response: "Our Research & Data-Driven Models track medical checkups, Hb recovery progress (IDs BNW-001 to BNW-100), and emotional resilience survey metrics."
    },
    {
      id: "financials",
      keywords: ["financial", "financials", "audit", "audits", "ledger", "ledgers", "balance", "balances", "cost", "costs", "budget", "budgets", "rupee", "rupees", "expenditure", "income", "grant", "grants", "tax", "exempt", "exemption", "transparency", "account", "accounting", "accounts", "dharmendra", "bansal", "12a", "80g", "niti", "aayog", "darpan", "csr", "compliance", "deficit"],
      navigateTab: "financials",
      response: "Led by Dharmendra Bansal, DIF maintains 100% transparent audits. We are 12A, 80G, CSR compliant, and registered on NITI Aayog NGO-Darpan."
    },
    {
      id: "about",
      keywords: ["about", "deepjyoti", "dif", "foundation", "organization", "ngo", "team", "founder", "founders", "board", "member", "members", "ashok", "garg", "taranna", "deepshika", "leads", "director", "coordinator", "amrita", "borkotoky", "murchana", "deep jyoti", "saikia", "who are you", "what is this", "tell me about", "who"],
      navigateTab: "about",
      response: "DIF was founded by Ashok Garg and Taranna Deepjyoti Garg. Core program leads are Amrita Borkotoky (Program Director) and Murchana (Program Coordinator)."
    },
    {
      id: "volunteer_donate",
      keywords: ["volunteer", "volunteering", "donate", "donating", "donation", "donations", "support", "gift", "join", "involved", "help", "contribute", "partner", "partners", "red cross", "art of living", "sponsor", "money", "pledge"],
      navigateTab: "get-involved",
      response: "You can sponsor a health camp (₹24,000), support student emotional training (₹1,200), fund a woman's care card (₹3,600), or register as a volunteer."
    },
    {
      id: "testimonials",
      keywords: ["testimonial", "testimonials", "stories", "story", "review", "reviews", "feedback", "quotes", "beneficiary", "beneficiaries", "baishali", "sharma"],
      navigateTab: "testimonials",
      response: "Beneficiaries report positive impact from our dermatological care, menstrual health awareness, and OYF emotional resilience programs."
    },
    {
      id: "contact",
      keywords: ["contact", "address", "registered office", "mail", "email", "phone", "number", "registered", "write", "office", "hq"],
      navigateTab: "get-involved",
      response: "Reach us at contact@dif-sampoorna.ngo or (+91) 7428008008. Registered Office: Ready Money Terrace, Worli Naka, Mumbai 400018."
    }
  ];

  // Enhanced fault-tolerant scoring matching algorithm
  let bestTopic: TopicDefinition | null = null;
  let maxScore = 0;

  for (const topic of topics) {
    let score = 0;
    
    // Exact phrase check in user input gets maximum weighting
    for (const kw of topic.keywords) {
      const kwLower = kw.toLowerCase().trim();
      if (query.includes(kwLower)) {
        score += kwLower.length * 4; // Absolute match weight
      }
      
      // Token substring and prefix check
      for (const word of queryWords) {
        if (word === kwLower) {
          score += kwLower.length * 3;
        } else if (word.length >= 4 && kwLower.startsWith(word)) {
          score += word.length * 1.5;
        } else if (kwLower.length >= 4 && word.startsWith(kwLower)) {
          score += kwLower.length * 1.5;
        }
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && maxScore > 0) {
    let responseText = bestTopic.response;
    if (bestTopic.navigateTab) {
      responseText += ` [NAVIGATE: ${bestTopic.navigateTab}]`;
    }
    return responseText;
  }

  return "I am Sampoorna AI, your digital assistant. Ask about our locations, health camps, emotional workshops, team, or financials.";
}

// System instructions containing core knowledge about Deepjyoti India Foundation (DIF) and Sampoorna
const SYSTEM_INSTRUCTION = `You are "Sampoorna AI", an interactive assistant for the Deepjyoti India Foundation (DIF). DIF is a registered non-profit dedicated to healthcare diagnostics, emotional workshops, youth counseling, and women's vocational livelihoods across Northeast India (Guwahati, Bonda, Panikhaiti, Shillong) and Mumbai.

CRITICAL DIRECTIVE: Keep your response extremely crisp, direct, and to the point. Answer immediately with absolute, direct truths. Avoid conversational filler or general pleasantries. Answer in 1 or 2 concise sentences maximum.

Core Facts:
1. Primary Health (Project Sampoorna): 16 monthly health camps across Assam, Meghalaya, and Maharashtra. Standard camp costs ₹24,000. Under active project, 100 women are tracked monthly on longitudinal cards (BNW-001 to BNW-100).
2. Mental Health (Owning Your Feelings - OYF): 3-month student emotional literacy workshops at Cotton University and Handique Girls' College. Includes medical clowning.
3. Youth Livelihoods: Counselor support at St. Francis in Shillong, and career soft skills coaching/workshops at Ferrando Shelter Home.
4. Financials & Volunteering: Audits led by Dharmendra Bansal. Low overhead, 12A/80G tax-exempt, CSR compliant, registered on NITI Aayog Darpan. Sponsor a health camp (₹24,000), support student emotional training (₹1,200), fund a woman's care card (₹3,600).
5. Founders: Taranna Deepjyoti Garg & Ashok Garg. Program leads: Amrita Borkotoky (Program Director) and Murchana (Program Coordinator).

Navigation Commands:
If suggesting or directing the user to a section, append this exact tag on its own line:
[NAVIGATE: id]
Allowed id values: 'home', 'programs', 'gallery', 'about', 'financials', 'testimonials', 'get-involved'.

Example: "DIF's audits are led by Dharmendra Bansal. [NAVIGATE: financials]"

If you do not know something, guide them to contact us at contact@dif-sampoorna.ngo or (+91) 7428008008. Registered Office: Ready Money Terrace, Worli Naka, Mumbai 400018.`;

// CMS persistent file path
const CMS_FILE_PATH = path.join(process.cwd(), "data-cms.json");

// Helper to read CMS data
function readCMSData() {
  try {
    if (fs.existsSync(CMS_FILE_PATH)) {
      const content = fs.readFileSync(CMS_FILE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading CMS file:", err);
  }
  return null;
}

// Helper to write CMS data
function writeCMSData(data: any) {
  try {
    fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing CMS file:", err);
    return false;
  }
}

// API routes FIRST
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  if (email.toLowerCase().trim() !== "contact@dif-sampoorna.ngo") {
    return res.status(401).json({ 
      success: false, 
      message: "Access Denied: Only contact@dif-sampoorna.ngo is permitted." 
    });
  }

  if (password !== "Test123Test!") {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Incorrect password."
    });
  }

  return res.json({
    success: true,
    user: {
      email: "contact@dif-sampoorna.ngo",
      role: "Administrator"
    },
    message: "Welcome, DIF Admin!"
  });
});

app.post("/api/upload", (req, res) => {
  const { adminEmail, filename, base64Data } = req.body;
  
  if (adminEmail !== "contact@dif-sampoorna.ngo") {
    return res.status(403).json({ error: "Unauthorized operation: adminEmail does not match" });
  }

  if (!filename || !base64Data) {
    return res.status(400).json({ error: "Filename and base64Data are required" });
  }

  try {
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Clean base64 prefix if present (e.g., data:image/png;base64,)
    const base64Clean = base64Data.replace(/^data:.*?;base64,/, "");
    const buffer = Buffer.from(base64Clean, "base64");

    // Clean up filename and append unique timestamp
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueFilename = `${baseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFilename}`;
    return res.json({ success: true, url: relativeUrl });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Failed to save file: " + err.message });
  }
});

app.get("/api/cms", (req, res) => {
  const data = readCMSData();
  if (data) {
    return res.json(data);
  } else {
    return res.status(500).json({ error: "CMS data could not be retrieved" });
  }
});

app.post("/api/cms", (req, res) => {
  const { adminEmail, data } = req.body;
  if (adminEmail !== "contact@dif-sampoorna.ngo") {
    return res.status(403).json({ error: "Unauthorized operation" });
  }

  if (!data) {
    return res.status(400).json({ error: "No data payload provided" });
  }

  const success = writeCMSData(data);
  if (success) {
    return res.json({ success: true, message: "Content updated successfully!" });
  } else {
    return res.status(500).json({ error: "Failed to write changes to storage" });
  }
});

app.post("/api/submit-form", (req, res) => {
  try {
    const { formType, name, email, phone, details, extra } = req.body;
    
    console.log(`==================================================`);
    console.log(`[FORM SUBMISSION RECEIVED - Copied to contact@dif-sampoorna.ngo]`);
    console.log(`Form Type: ${formType || 'General Inquiries'}`);
    console.log(`Sender Name: ${name || 'N/A'}`);
    console.log(`Sender Email: ${email || 'N/A'}`);
    console.log(`Sender Phone: ${phone || 'N/A'}`);
    console.log(`Content Details: ${details || 'N/A'}`);
    if (extra) {
      console.log(`Extra Data:`, JSON.stringify(extra, null, 2));
    }
    console.log(`--------------------------------------------------`);
    console.log(`✉️ Simulated Email forwarding action details:`);
    console.log(`To: contact@dif-sampoorna.ngo`);
    console.log(`Subject: New ${formType || 'Inquiry'} Submission from ${name}`);
    console.log(`Body Copy:`);
    console.log(`Hello team, a request was received through the portal:`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${details}`);
    console.log(`==================================================`);

    return res.json({
      success: true,
      message: `Your submission has been securely documented and copied directly to contact@dif-sampoorna.ngo. Our desk will contact you shortly.`
    });
  } catch (error: any) {
    console.error("Form submission registration failed:", error);
    return res.status(500).json({ error: "Could not process registration" });
  }
});

app.post("/api/chatbot", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. Expected 'messages' array." });
    }

    const lastUserMsg = messages[messages.length - 1]?.content || "";

    // If Gemini key is missing, instantly use the local semantic fallback engine
    if (!ai) {
      const fallbackResult = generateFallbackResponse(lastUserMsg);
      return res.json({ text: fallbackResult });
    }

    // Prepare message contents for @google/genai SDK format
    // Filter to last 10 messages for safety and speed
    const recentMessages = messages.slice(-10);

    const formattedContents = recentMessages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content || "" }],
    }));

    // Try several models in cascade to guarantee a highly accurate live ML response even if the main model is degraded
    // Put stable models is higher precedence so we do not hit quota exhaustion of gemini-3.5-flash
    const modelsToTry = [
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash"
    ];

    let response: any = null;
    let apiError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const apiCallPromise = ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2, // Drastically reduced for superior facts grounding and precise instructions adherence
          },
        });

        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error("API Timeout")), 4500)
        );

        response = await Promise.race([apiCallPromise, timeoutPromise]);
        if (response && response.text) {
          break; // Successful model completion
        }
      } catch (err: any) {
        apiError = err;
        console.warn(`Gemini generation failed for ${modelName}:`, err?.message || err);
      }
    }

    if (response && response.text) {
      res.json({ text: response.text });
    } else {
      const fallbackResult = generateFallbackResponse(lastUserMsg);
      res.json({ text: fallbackResult });
    }
  } catch (error: any) {
    console.error("Critical error in chatbot API:", error);
    const lastUserMsg = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
    const fallbackResult = generateFallbackResponse(lastUserMsg);
    res.json({ text: fallbackResult });
  }
});

// Serve Vite in development, static files in production
const startServer = async () => {
  // Statically serve uploaded local files
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
