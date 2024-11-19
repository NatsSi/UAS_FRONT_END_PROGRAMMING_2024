const favoriteIcons = document.querySelectorAll('.favorite-icon');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-favorites'); // Ambil elemen input pencarian

const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(favorite => {
        addFavoriteToDOM(favorite);
        updateHeartIcon(favorite.src, true);
    });
};

const addFavoriteToDOM = (favorite) => {
    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('favorite-item');
    favoriteItem.innerHTML = `
        <img src="${favorite.image}" alt="${favorite.title}">
        <div class="favorite-content">
            <h4>${favorite.title}</h4>
            <a class="cta-button" href="${favorite.src}">Watch <i class="fa-solid fa-eye"></i></a>
            <button class="remove-favorite-button">Remove</button>  
        </div>
    `;
    favoritesList.appendChild(favoriteItem);

    const removeButton = favoriteItem.querySelector('.remove-favorite-button');
    removeButton.addEventListener('click', () => {
        removeFavorite(favorite.src);
    });
};

const updateHeartIcon = (videoSrc, isFavorite) => {
    const icon = [...favoriteIcons].find(icon => icon.getAttribute('data-video-src') === videoSrc);
    if (icon) {
        const heartIcon = icon.querySelector('i');
        heartIcon.classList.toggle('fa-solid', isFavorite); 
        heartIcon.classList.toggle('fa-regular', !isFavorite); 
        heartIcon.style.color = isFavorite ? 'red' : 'black'; 
    }
};

const removeFavorite = (videoSrc) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteIndex = favorites.findIndex(fav => fav.src === videoSrc);
    if (favoriteIndex !== -1) {
        favorites.splice(favoriteIndex, 1); 
        localStorage.setItem('favorites', JSON.stringify(favorites)); 
        updateFavoritesList(); 
        updateHeartIcon(videoSrc, false); 
    }
};

const updateFavoritesList = () => {
    favoritesList.innerHTML = ''; 
    loadFavorites(); 
};

const filterFavorites = (query) => {
    const favoriteItems = document.querySelectorAll('.favorite-item');
    favoriteItems.forEach(item => {
        const title = item.querySelector('h4').innerText.toLowerCase(); 
        if (title.includes(query)) {
            item.style.display = ''; 
        } else {
            item.style.display = 'none'; 
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites(); 

    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const videoSrc = icon.getAttribute('data-video-src');
            const videoTitle = icon.getAttribute('data-title');
            const videoImage = icon.getAttribute('data-image');
            const favorite = { title: videoTitle, image: videoImage, src: videoSrc };
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const favoriteIndex = favorites.findIndex(fav => fav.src === videoSrc);

            if (favoriteIndex === -1) {
                favorites.push(favorite);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                addFavoriteToDOM(favorite);
                updateHeartIcon(videoSrc, true); 
                alert('Success added item to your favorite list');
            } else {
                alert('This content is already added to your favorite list');
            }
        });
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase(); 
        filterFavorites(query); 
    });
});
