let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
let dots = document.querySelectorAll('.dots .dot');


//config param
let countItem = items.length;
let itemActive = 0;

//event next click
next.onclick = function(){  
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

prev.onclick = function() {
    itemActive = itemActive - 1;
    if(itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}

function showSlider(){
    //remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    let dotActiveOld = document.querySelector('.dots .dot.active');

    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active')
    dotActiveOld.classList.remove('active');

    //active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    dots[itemActive].classList.add('active'); 

    //clear auto time run slider 
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

//click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

//click dot
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

//auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 3000)