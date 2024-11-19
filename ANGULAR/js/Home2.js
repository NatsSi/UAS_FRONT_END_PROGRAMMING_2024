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

loadHTML('Navbar2.html', 'navbar');
loadHTML('Footer.html', 'footer');

// Animation fade in
const items = document.querySelectorAll('.appear');

const active = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview'); 
        }
    });
}
const io = new IntersectionObserver(active);
 for(let i=0; i < items.length; i++){
    io.observe(items[i]);
 }

const items2 = document.querySelectorAll('.appear2');

const active2 = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview2'); 
        }
    });
}
const io2 = new IntersectionObserver(active2);
 for(let i=0; i < items2.length; i++){
    io2.observe(items2[i]);
 }

const items3 = document.querySelectorAll('.appear3');

const active3 = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview3'); 
        }
    });
}
const io3 = new IntersectionObserver(active3);
 for(let i=0; i < items3.length; i++){
    io3.observe(items3[i]);
 }

const items4 = document.querySelectorAll('.appear4');

const active4 = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview4'); 
        }
    });
}
const io4 = new IntersectionObserver(active4);
 for(let i=0; i < items4.length; i++){
    io4.observe(items4[i]);
 }

const items5 = document.querySelectorAll('.appear5');

const active5 = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview5'); 
        }
    });
}
const io5 = new IntersectionObserver(active5);
 for(let i=0; i < items5.length; i++){
    io5.observe(items5[i]);
 }

const items6 = document.querySelectorAll('.appear6');

const active6 = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('inview6'); 
        }
    });
}
const io6 = new IntersectionObserver(active6);
 for(let i=0; i < items6.length; i++){
    io6.observe(items6[i]);
 }