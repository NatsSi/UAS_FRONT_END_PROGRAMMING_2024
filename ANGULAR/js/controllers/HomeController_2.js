angular.module('HomeController_2', [])
    .controller('HomeController_2', ['$scope', function ($scope) {
        $scope.homeJS = function() {
            // Animation fade in
            const items1 = document.querySelectorAll('.appear');

            const active = function(entries){
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                    entry.target.classList.add('inview'); 
                    }
                });
            }
            const io = new IntersectionObserver(active);
            for(let i=0; i < items1.length; i++){
                io.observe(items1[i]);
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


            //Slider
            let items = document.querySelectorAll('.slider .list .item');
            let next = document.getElementById('next');
            let prev = document.getElementById('prev');
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
                let dotActiveOld = document.querySelector('.dots .dot.active');

                itemActiveOld.classList.remove('active');
                dotActiveOld.classList.remove('active');

                //active new item
                items[itemActive].classList.add('active');
                dots[itemActive].classList.add('active'); 

            }

            //click dot
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    itemActive = index;
                    showSlider();
                });
            });

            //-----------QUIZ SECTION------------//-------
            const quizData = [
                {
                    question: "What is the primary benefit of yoga?",
                    answers: [
                        { text: "Increases strength", correct: true },
                        { text: "Improves sleep", correct: true },
                        { text: "Boosts energy", correct: true },
                        { text: "All of the above", correct: true },
                    ],
                },
                {
                    question: "Which yoga pose is also known as the 'downward-facing dog'?",
                    answers: [
                        { text: "Adho Mukha Svanasana", correct: true },
                        { text: "Utkatasana", correct: false },
                        { text: "Tadasana", correct: false },
                        { text: "Vrikshasana", correct: false },
                    ],
                },
                {
                    question: "How many primary series are there in Ashtanga Yoga?",
                    answers: [
                        { text: "1", correct: false },
                        { text: "3", correct: false },
                        { text: "6", correct: true },
                        { text: "8", correct: false },
                    ],
                },
                {
                    question: "Which of the following is NOT a yoga style?",
                    answers: [
                        { text: "Hatha", correct: false },
                        { text: "Vinyasa", correct: false },
                        { text: "Zumba", correct: true },
                        { text: "Iyengar", correct: false },
                    ],
                },
                {
                    question: "What does 'Namaste' mean?",
                    answers: [
                        { text: "Thank you", correct: false },
                        { text: "I bow to you", correct: true },
                        { text: "Goodbye", correct: false },
                        { text: "Welcome", correct: false },
                    ],
                },
                {
                    question: "Which of the following is a breathing technique used in yoga?",
                    answers: [
                        { text: "Pranayama", correct: true },
                        { text: "Asana", correct: false },
                        { text: "Meditation", correct: false },
                        { text: "Savasana", correct: false },
                    ],
                },
                {
                    question: "What is the meaning of the term 'chakra'?",
                    answers: [
                        { text: "Energy center", correct: true },
                        { text: "Pose", correct: false },
                        { text: "Meditation", correct: false },
                        { text: "Breath", correct: false },
                    ],
                },
                {
                    question: "Which yoga style focuses on alignment and precision?",
                    answers: [
                        { text: "Kundalini", correct: false },
                        { text: "Ashtanga", correct: false },
                        { text: "Iyengar", correct: true },
                        { text: "Bikram", correct: false },
                    ],
                },
            ];

            let currentQuestionIndex = 0;
            let score = 0;

            const quizContainer = document.getElementById('quiz');
            const questionElement = document.getElementById('question');
            const answerButtonsElement = document.getElementById('answer-buttons');
            const nextButton = document.getElementById('next-button');
            const resultContainer = document.getElementById('result-container');
            const scoreElement = document.getElementById('score');
            const restartButton = document.getElementById('restart-button');

            function startQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                quizContainer.style.display = 'block';
                resultContainer.style.display = 'none';
                nextButton.style.display = 'none';
                answerButtonsElement.innerHTML = ''; // Clear previous correct answer text
                showQuestion(quizData[currentQuestionIndex]);
            }

            startQuiz();

            function showQuestion(question) {
                questionElement.innerText = question.question;
                answerButtonsElement.innerHTML = '';
                question.answers.forEach(answer => {
                    const button = document.createElement('button');
                    button.innerText = answer.text;
                    button.classList.add('btn');
                    button.addEventListener('click', () => selectAnswer(answer, button));
                    answerButtonsElement.appendChild(button);
                });
                clearCorrectAnswerText(); // Clear any previous correct answer text
            }

            function selectAnswer(answer, button) {
                const isCorrect = answer.correct;
                if (isCorrect) {
                    score++;
                    button.classList.add('correct');
                } else {
                    button.classList.add('incorrect');
                    showCorrectAnswer(quizData[currentQuestionIndex].answers);
                }

                // Nonaktifkan semua tombol setelah menjawab
                const buttons = answerButtonsElement.querySelectorAll('button');
                buttons.forEach(btn => btn.disabled = true);

                // Tampilkan tombol Next jika masih ada pertanyaan berikutnya
                if (currentQuestionIndex < quizData.length - 1) {
                    nextButton.style.display = 'block';
                } else {
                    showResult(); // Tampilkan hasil jika pertanyaan habis
                }
            }

            function showCorrectAnswer(answers) {
                const correctAnswer = answers.find(answer => answer.correct);
                const correctAnswerText = document.createElement('p');
                correctAnswerText.innerText = `Correct Answer: ${correctAnswer.text}`;
                correctAnswerText.classList.add('correct-answer-text'); // Optional styling class
                answerButtonsElement.appendChild(correctAnswerText);
            }

            function clearCorrectAnswerText() {
                const existingText = document.querySelector('.correct-answer-text');
                if (existingText) {
                    existingText.remove(); // Remove any previous correct answer text
                }
            }

            function nextQuestion() {
                nextButton.style.display = 'none'; // Sembunyikan tombol Next
                showQuestion(quizData[currentQuestionIndex]);
            }

            nextButton.addEventListener('click', () => {
                currentQuestionIndex++; // Tambah indeks pertanyaan
                nextQuestion(); // Tampilkan pertanyaan berikutnya
            });

            function showResult() {
                quizContainer.style.display = 'none';
                resultContainer.style.display = 'block';
                scoreElement.innerText = `${score} out of ${quizData.length}`;
                restartButton.style.display = 'block'; 
            }

            $scope.restartQuiz = function() {
                startQuiz();
            };



            // --------------- FAVORITE VIDEOS ---------------------//
           document.addEventListener('DOMContentLoaded', () => {
                const favoriteIcons = document.querySelectorAll('.favorite-icon');
                const favoritesList = document.getElementById('favorites-list');
                const searchInput = document.getElementById('search-favorites'); // Elemen input pencarian

                // Fungsi memuat item favorit dari localStorage
                const loadFavorites = () => {
                    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    favorites.forEach(favorite => {
                        if (!isFavoriteInDOM(favorite.src)) {
                            addFavoriteToDOM(favorite);
                            updateHeartIcon(favorite.src, true);
                        }
                    });
                };

                // Fungsi menambahkan item favorit ke DOM
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

                    // Event listener untuk tombol hapus
                    const removeButton = favoriteItem.querySelector('.remove-favorite-button');
                    removeButton.addEventListener('click', () => {
                        removeFavorite(favorite.src);
                    });
                };

                // Fungsi untuk mengupdate ikon hati
                const updateHeartIcon = (videoSrc, isFavorite) => {
                    const icon = [...favoriteIcons].find(icon => icon.getAttribute('data-video-src') === videoSrc);
                    if (icon) {
                        const heartIcon = icon.querySelector('i');
                        heartIcon.classList.toggle('fa-solid', isFavorite);
                        heartIcon.classList.toggle('fa-regular', !isFavorite);
                        heartIcon.style.color = isFavorite ? 'red' : 'black';
                    }
                };

                // Fungsi untuk menghapus item favorit
                const removeFavorite = (videoSrc) => {
                    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    const updatedFavorites = favorites.filter(fav => fav.src !== videoSrc);
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    updateFavoritesList();
                    updateHeartIcon(videoSrc, false);
                };

                // Fungsi untuk memperbarui daftar favorit
                const updateFavoritesList = () => {
                    favoritesList.innerHTML = '';
                    loadFavorites();
                };

                // Fungsi untuk memfilter item favorit berdasarkan pencarian
                const filterFavorites = (query) => {
                    const favoriteItems = document.querySelectorAll('.favorite-item');
                    favoriteItems.forEach(item => {
                        const title = item.querySelector('h4').innerText.toLowerCase();
                        item.style.display = title.includes(query) ? '' : 'none';
                    });
                };

                // Fungsi untuk memeriksa apakah item favorit sudah ada di DOM
                const isFavoriteInDOM = (videoSrc) => {
                    return Array.from(favoritesList.querySelectorAll('.cta-button'))
                        .some(link => link.href === videoSrc);
                };

                // Event listener untuk ikon favorit
                favoriteIcons.forEach(icon => {
                    icon.addEventListener('click', () => {
                        const videoSrc = icon.getAttribute('data-video-src');
                        const videoTitle = icon.getAttribute('data-title');
                        const videoImage = icon.getAttribute('data-image');

                        // Validasi atribut
                        if (!videoSrc || !videoTitle || !videoImage) {
                            alert('Invalid data for this favorite item.');
                            return;
                        }

                        const favorite = { title: videoTitle, image: videoImage, src: videoSrc };
                        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                        const isAlreadyFavorite = favorites.some(fav => fav.src === videoSrc);

                        if (!isAlreadyFavorite) {
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

                // Event listener untuk input pencarian
                searchInput.addEventListener('input', () => {
                    const query = searchInput.value.toLowerCase();
                    filterFavorites(query);
                });

                // Memuat favorit saat halaman dimuat
                loadFavorites();
            })
        }

        $scope.homeJS();
        
}]);