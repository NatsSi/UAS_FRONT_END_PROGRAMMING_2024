const videoButtons = document.querySelectorAll('.content .cta-button');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');
const videoSource = document.getElementById('video-source');
const closeVideoButton = document.getElementById('close-video');
const serviceItems = document.querySelectorAll('.service-item');

videoButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const videoSrc = this.getAttribute('data-video-src');
        videoSource.setAttribute('src', videoSrc);
        videoPlayer.load(); 
        videoContainer.classList.add('active'); 
        videoPlayer.play(); 
    });
});

serviceItems.forEach(item => {
    item.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video-src');
        
        if (videoSrc) {
            videoSource.setAttribute('src', videoSrc);
            videoPlayer.load(); 
            videoContainer.classList.add('active'); 
            videoPlayer.play(); 
        } else {
            console.log("No video source found!"); 
        }
    });
});


closeVideoButton.addEventListener('click', function() {
    videoPlayer.pause(); 
    videoContainer.classList.remove('active'); 
    videoSource.setAttribute('src', ''); 
});
