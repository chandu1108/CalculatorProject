document.getElementById('loan-form').addEventListener('submit', function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(calculate, 2000); 
  e.preventDefault();
});

function calculate() {
  const amount = parseFloat(document.getElementById("loan_amount").value);
  const interest = parseFloat(document.getElementById("interest").value / 100 / 12);
  const paymentOption = document.querySelector('input[name="payment_option"]:checked').value;
  const paymentPeriod = parseFloat(document.getElementById("payment_period").value);

  let totalPayments;
  if (paymentOption === "years") {
    totalPayments = paymentPeriod * 12;
  } else if (paymentOption === "months") {
    totalPayments = paymentPeriod;
  }

  const x = Math.pow(1 + interest, totalPayments);
  const monthly = (amount * x * interest) / (x - 1);

  if (isFinite(monthly)) {
    document.getElementById("monthly_payment").value = monthly.toFixed(2);
    document.getElementById("total_amount").value = (monthly * totalPayments).toFixed(2);
    document.getElementById("total_interest").value = (monthly * totalPayments - amount).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showAlert("Please Enter the Values");
    document.getElementById("loading").style.display = "none";

  }
}

function showAlert(error) {
  const errorDiv = document.createElement('div');
  errorDiv.className = "alert alert-danger";
  errorDiv.textContent = error; 
  document.getElementById("loan-form").appendChild(errorDiv);
}
