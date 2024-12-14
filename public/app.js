// Hämta valda övningar
function getSelectedExercises() {
  const checkboxes = document.querySelectorAll(
    'input[name="exercises"]:checked'
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

// Beräkna energi och fokus från övningar
function calculateEnergyAndFocus(selectedExercises) {
  const exerciseValues = {
    styrketräning: { energy: 1, focusPhysical: 0 },
    löpning: { energy: 1, focusPhysical: 1 },
    cykling: { energy: 0, focusPhysical: 1 },
    yoga: { energy: 0, focusPhysical: 1 },
    stretching: { energy: 0, focusPhysical: 0 },
    simning: { energy: 1, focusPhysical: 1 },
  };

  let totalEnergy = 0;
  let totalFocusPhysical = 0;

  selectedExercises.forEach((exercise) => {
    if (exerciseValues[exercise]) {
      totalEnergy = Math.max(totalEnergy, exerciseValues[exercise].energy);
      totalFocusPhysical = Math.max(
        totalFocusPhysical,
        exerciseValues[exercise].focusPhysical
      );
    }
  });

  return { energy: totalEnergy, focusPhysical: totalFocusPhysical };
}

// Skicka inputs till server och hämta rekommendationer
function fetchRecommendations(energy, focusPhysical) {
  const data = { energy, focusPhysical };

  fetch("http://localhost:3000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Rådata från servern:", data.rawInput);
      console.log("Prediktioner från servern:", data.predictions);

      displayRecommendations(data.predictions);
      displayRawData(data.rawInput); // Visa rådatan på sidan
    })
    .catch((error) => console.error("Error:", error));
}

// Visa rekommendationer
function displayRecommendations(predictions) {
  const stretchElement = document.getElementById("stretch");
  const foodElement = document.getElementById("food");

  stretchElement.textContent = predictions.stretch
    ? "Rekommenderas"
    : "Inte nödvändigt";
  foodElement.textContent = predictions.food
    ? "Rekommenderas"
    : "Inte nödvändigt";
}

// Visa rådatan på sidan
function displayRawData(rawInput) {
  const rawDataElement = document.getElementById("rawData");
  rawDataElement.textContent = JSON.stringify(rawInput, null, 2); // Formaterar JSON för läsbarhet
}

// Hantera visa/dölja rådata
document.getElementById("toggleRawDataBtn").addEventListener("click", () => {
  const rawDataElement = document.getElementById("rawData");
  const isHidden = rawDataElement.style.display === "none";

  rawDataElement.style.display = isHidden ? "block" : "none";
});

// Hantera formulärsubmit
document.getElementById("submitBtn").addEventListener("click", () => {
  const selectedExercises = getSelectedExercises();

  if (selectedExercises.length === 0) {
    alert("Välj minst en övning.");
    return;
  }

  const { energy, focusPhysical } = calculateEnergyAndFocus(selectedExercises);
  fetchRecommendations(energy, focusPhysical);
});
