const subscribeButtons = document.querySelectorAll('.subscribe-btn');

subscribeButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const card = this.closest('.card');
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
    const activeCard = document.querySelector(".card.active");

    if (activeCard) {
        window.location.href = "../html/Register_Step_3.html";
    } else {
        alert("Please select a subscription plan before proceeding.");
    }
});
