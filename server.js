import express from "express";
import bodyParser from "body-parser";
import { getRecommendations } from "./model.js";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Hälsokontroll
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

// Förutsägelse-rout
app.post("/predict", (req, res) => {
  const { energy, focusPhysical } = req.body;

  // Validera inputs
  if (typeof energy !== "number" || typeof focusPhysical !== "number") {
    return res.status(400).json({ error: "Inputs måste vara siffror." });
  }

  // Hämta predictions och logga i terminalen
  const predictions = getRecommendations({ energy, focusPhysical });
  console.log("Förutsägelse skickad till klienten:", predictions);

  // Returnera resultat
  res.json({ rawInput: { energy, focusPhysical }, predictions });
});

// Starta server
app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
