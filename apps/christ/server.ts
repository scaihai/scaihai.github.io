import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        return res.status(200).json({
          text: `⚠️ **API Key Missing**: The \`GEMINI_API_KEY\` environment variable has not been configured in your Secrets panel yet.

I can still guide you through all the pre-loaded investigative data! However, for live interactive questions, please add your Gemini API key in the **Settings > Secrets** panel in AI Studio.

Here is an analytical answer based on pre-loaded database coordinates:

You're inquiring about: "${message}"

**Core Investigation & Conversational Pillars:**
1. **The Bibliographical Test**: The New Testament possesses over 5,800 Greek manuscripts (24,000+ total in ancient languages) with fragments dating within 50–70 years of original writing—drastically surpassing classical works like Caesar's Gallic Wars (10 copies, 1,000-year gap) or Homer's Iliad (~1,750 copies, 400-year gap). This supports 99.5%+ textual preservation accuracy.
2. **The Archaeological Record**: Discoveries like the Pontius Pilate Stone ( Caesarea Maritima, 1961), the Pool of Bethesda (John 5:2 structure verified in 1888), and the inscribed Ossuary of High Priest Caiaphas (1990) continuously validate the literal geographical and historical background of the Gospel records, dismantling claims of manufactured myth.
3. **Medical Certainty of Death**: Refutes the "Swoon Theory." Professional Roman executioners checked death by spear wounds. John 19:34's record of "blood and water" is a clinically accurate description of hypovolemic shock causing pericardial effusion (fluid around heart) or pleural effusion (around lungs). John had no first-century medical training, proving eyewitness authenticity rather than a staged resuscitation.
4. **The Jerusalem Factor**: Fabricating a resurrection hoax inside the exact city where the public execution occurred just weeks prior is a sociological impossibility. If the claim was fraudulent, enemies had only to walk 10 minutes to the tomb and display the physical body to crush the movement instantly. Their silence and the church's explosion right under the authorities' noses prove the tomb's absolute vacancy.
5. **Prophetic & Eyewitness Metrics**: Including the Qumran Dead Sea Scrolls confirming Isaiah 53/Micah 5 prediction antiquity and Peter Stoner's mathematical composite likelihood (e.g., 1 in 10¹⁷ for 8 prophecies).

Please insert your \`GEMINI_API_KEY\` in the settings menu of AI Studio to enable fully dynamic deep-reasoning chats on any specific historical text, citation, or skeptic counter-theory!`,
          warning: "API_KEY_MISSING"
        });
      }

      // Initialize Gemini Client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare system instruction
      const systemInstruction = `You are the "Christianity Evidence Analyst", an objective, scholarly, and extremely sharp historical investigator. 
Your purpose is to help the user explore the structural, textual, statistical, and archaeological evidence for the Christian faith, including:
1. The Messianic Prophecies of the Old Testament (Timeline, authenticity via Qumran/Dead Sea Scrolls, and statistical probabilities by Stoner).
2. Empty Tomb Logistics (Roman guard koustodia, imperial seal, massive stone dimensions, psychological state of the disciples, and theories like the Stolen Body, Swoon, or Hallucination).
3. The Four Core Evidence Pillars:
   - The Bibliographical Test (comparing NT manuscript preservation and time gaps against Homer's Iliad and Caesar's Gallic Wars).
   - The Archaeological Record (verifying people and places through the Pilate Stone, Pool of Bethesda, and Caiaphas Box).
   - Medical Certainty of Death (the medical impossibility of surviving crucifixion, hypovolemic shock, side spear thrust releasing pericardial or pleural fluid 'blood and water' of John 19:34).
   - The Jerusalem Factor (sociological proof of launching resurrection claims right under hostile authorities in the execution city where the body could have been recovered in a 10-minute walk).
4. Eyewitness Accounts (Pre-Pauline Creeds such as 1 Corinthians 15, mass auditory/visual hallucination limits, the sudden conversion of severe skeptics like James and Saul of Tarsus, and physical records).
5. General issues of biblical historical reliability and external historians (Tacitus, Josephus, Pliny the Younger).

Keep your tone crisp, scholarly, objective, and analytical. Frame explanations like a historical detective examining evidence under a magnifying glass. Present the arguments cleanly with formatted markdown, lists, and precise references. If there are secular objections, explain them first before showing how historians or scholars respond. Always remain helpful, non-preachy, and intellectually honest. Ensure that equations or mathematical likelihoods are easy to read.`;

      // Structure chat options
      const chatHistory = Array.isArray(history) ? history.map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })) : [];

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Serve static/assets or use Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for SPA router fallbacks
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
