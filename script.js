function detectFraud() {

    const amount = Number(document.getElementById("amount").value);
    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;
    const frequency = Number(document.getElementById("frequency").value);
    const international = document.getElementById("international").value;

    if (!amount || !location || !time || frequency === 0 && frequency !== 0) {
        alert("Please enter all transaction details.");
        return;
    }

    let risk = 10;

    // High transaction amount
    if (amount > 50000) {
        risk += 25;
    } else if (amount > 20000) {
        risk += 15;
    }

    // High transaction frequency
    if (frequency > 10) {
        risk += 25;
    } else if (frequency > 5) {
        risk += 15;
    }

    // International transaction
    if (international === "yes") {
        risk += 20;
    }

    // Late-night transaction
    const hour = Number(time.split(":")[0]);

    if (hour >= 0 && hour <= 5) {
        risk += 15;
    }

    // Keep risk between 0 and 100
    risk = Math.min(risk, 100);

    let resultTitle;
    let resultMessage;
    let status;

    if (risk >= 60) {

        resultTitle = "⚠️ Fraud Suspected";
        resultMessage =
            "This transaction shows a high-risk pattern and requires verification.";

        status = "High Risk";

    } else if (risk >= 35) {

        resultTitle = "🔎 Suspicious Transaction";
        resultMessage =
            "Additional verification is recommended before approval.";

        status = "Medium Risk";

    } else {

        resultTitle = "✅ Transaction Looks Legitimate";
        resultMessage =
            "No major suspicious pattern was detected.";

        status = "Low Risk";
    }

    document.querySelector(".result h2").textContent = resultTitle;
    document.querySelector(".result p").textContent = resultMessage;

    document.getElementById("riskValue").textContent = risk + "%";
    document.getElementById("riskBar").style.width = risk + "%";
    document.getElementById("status").textContent = status;
}