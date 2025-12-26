document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    Pclass: parseInt(document.getElementById("Pclass").value),
    Sex: document.getElementById("Sex").value,
    Age: parseFloat(document.getElementById("Age").value),
    SibSp: parseInt(document.getElementById("SibSp").value),
    Parch: parseInt(document.getElementById("Parch").value),
    Fare: parseFloat(document.getElementById("Fare").value),
    Embarked: document.getElementById("Embarked").value
  };

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Predicting...";

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.prediction === 1) {
      resultDiv.innerHTML = `✅ Survived <br> Probability: ${result.survival_probability}`;
      resultDiv.style.color = "green";
    } else {
      resultDiv.innerHTML = `❌ Not Survived <br> Probability: ${result.survival_probability}`;
      resultDiv.style.color = "red";
    }

  } catch (error) {
    resultDiv.innerHTML = "❌ API Error";
    resultDiv.style.color = "red";
  }
});
