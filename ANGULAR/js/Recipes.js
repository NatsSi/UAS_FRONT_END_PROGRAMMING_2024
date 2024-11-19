document.addEventListener('DOMContentLoaded', () => {
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

    // Load Navbar and Footer
    loadHTML('Navbar.html', 'navbar');
    loadHTML('Footer.html', 'footer');

    // Intersection Observer for appear class
    const items = document.querySelectorAll('.appear');

    const active = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('inview');
            }
        });
    };

    const io = new IntersectionObserver(active);
    items.forEach(item => io.observe(item));

    // Intersection Observer for appear2 class
    const items2 = document.querySelectorAll('.appear2');

    const active2 = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('inview2');
            }
        });
    };

    const io2 = new IntersectionObserver(active2);
    items2.forEach(item => io2.observe(item));
});
