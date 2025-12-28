async function predict() {
  const resultEl = document.getElementById("result");
  resultEl.innerText = "⏳ Predicting...";

  const payload = {
    Pclass: Number(document.getElementById("pclass").value),
    Sex: document.getElementById("sex").value,
    Age: Number(document.getElementById("age").value),
    SibSp: 0,        // REQUIRED by API
    Parch: 0,        // REQUIRED by API
    Fare: Number(document.getElementById("fare").value),
    Embarked: document.getElementById("embarked").value
  };

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();

    resultEl.innerText =
      data.prediction === 1
        ? `✅ Survived (Probability: ${data.survival_probability})`
        : `❌ Not Survived (Probability: ${data.survival_probability})`;

  } catch (error) {
    console.error(error);
    resultEl.innerText = "❌ Error calling API (check console)";
  }
}
