import brain from "brain.js";

// Skapa och träna en förenklad neural nätverksmodell
const net = new brain.NeuralNetwork();

const trainingData = [
  // Låg energi och fokus → Ingen stretch eller mat
  { input: { energy: 0, focusPhysical: 0 }, output: { stretch: 0, food: 0 } },

  // Hög energi, lågt fokus → Behöver mat men ingen stretch
  { input: { energy: 1, focusPhysical: 0 }, output: { stretch: 0, food: 1 } },

  // Låg energi, högt fokus → Behöver stretch men ingen mat
  { input: { energy: 0, focusPhysical: 1 }, output: { stretch: 1, food: 0 } },

  // Hög energi och högt fokus → Behöver både stretch och mat
  { input: { energy: 1, focusPhysical: 1 }, output: { stretch: 1, food: 1 } },

  // Trött (låg energi) men högt fokus → Stretch för återhämtning
  { input: { energy: 0, focusPhysical: 1 }, output: { stretch: 1, food: 0 } },

  // Piggt (hög energi) men lågt fokus → Mat behövs för mental energi
  { input: { energy: 1, focusPhysical: 0 }, output: { stretch: 0, food: 1 } },

  // Medium energi och fokus (tänk 50%) → Behöver både stretch och mat
  {
    input: { energy: 0.5, focusPhysical: 0.5 },
    output: { stretch: 1, food: 1 },
  },

  // Hög energi, inget fokus (motsvarar mental trötthet) → Mat behövs
  { input: { energy: 1, focusPhysical: 0 }, output: { stretch: 0, food: 1 } },

  // Låg energi och inget fokus → Ingen aktivitet behövs
  { input: { energy: 0, focusPhysical: 0 }, output: { stretch: 0, food: 0 } },
];

net.train(trainingData, {
  iterations: 1000,
  errorThresh: 0.005,
  log: true,
  logPeriod: 100,
  learningRate: 0.3,
});

// Returnera rekommendationer och logga inputs/outputs
export function getRecommendations({ energy, focusPhysical }) {
  const predictions = net.run({ energy, focusPhysical });

  // Logga inputs och outputs i terminalen
  console.log("Rådata (inputs):", { energy, focusPhysical });
  console.log("Prediction (outputs):", predictions);

  // Binarisera outputs
  return {
    stretch: predictions.stretch >= 0.5 ? 1 : 0,
    food: predictions.food >= 0.5 ? 1 : 0,
  };
}
