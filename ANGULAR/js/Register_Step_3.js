const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');

    if (selectedPaymentMethod) {
        localStorage.setItem("registered", "true");
        window.location.href = "Login.html";
    } else {
        alert("Please select a payment method before proceeding.");
    }
});
