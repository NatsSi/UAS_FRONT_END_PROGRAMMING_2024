// Load HTML function

function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with ID "${elementId}" not found.`);
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

loadHTML('Navbar.html', 'navbar');
loadHTML('Footer.html', 'footer');