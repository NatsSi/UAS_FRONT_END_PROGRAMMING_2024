angular.module('EventsController', ['EventsService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('EventsController', ['$scope', '$http', '$window', '$route', '$routeParams', 'EventsService', function ($scope, $http, $window, $route, $routeParams, EventsService) {
        $scope.formData = {}; //Untuk Read & Update
        $scope.formDataCreate = {}; //Untuk Create
        $scope.data = {}; //Untuk Read
        $scope.Data = false; //Untuk apakah data sudah ada atau belum
        $scope.eventId = $routeParams.id; //Untuk Read, Update & Delete
        //$scope.eventId = localStorage.getItem('eventId'); 
        $scope.items = []; //Untuk menyimpan response

        //Pagination
        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.itemsPerPage = 3;

        //Filter
        $scope.categories = ['Health','Travel','Environment']; // List kategori
        $scope.selectedCategory = ""; // Kategori terpilih


        //Search
        $scope.searchQuery = ''; // Search query
        $scope.date = null;

        //Sort
        $scope.sort = '';

        $scope.isNearestDisabled = true; // Status awal Nearest
        $scope.isFarthestDisabled = false; // Status awal Farthest

        $scope.toggleDisable = function(button) {
        if (button === 'nearest') {
            $scope.isNearestDisabled = true;  // Nonaktifkan tombol Nearest
            $scope.isFarthestDisabled = false; // Pastikan tombol Farthest tetap aktif
        } else if (button === 'farthest') {
            $scope.isFarthestDisabled = true;  // Nonaktifkan tombol Farthest
            $scope.isNearestDisabled = false; // Pastikan tombol Nearest tetap aktif
        }
        };

        $scope.eventsJS = function() {
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

            let currentSlide = 0;
            const slides = document.querySelectorAll('.card-course');
            const dots = document.querySelectorAll('.dot');

            function showSlide(index) {
                if (index >= slides.length) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = slides.length - 1;
                } else {
                    currentSlide = index;
                }
                
                slides.forEach((slide, i) => {
                    slide.style.display = 'none';
                    dots[i].classList.remove('active');
                });
                slides[currentSlide].style.display = 'flex';
                dots[currentSlide].classList.add('active');
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            function prevSlide() {
                showSlide(currentSlide - 1);
            }

            // Add event listeners for navigation buttons
            function changeSlide(n) {
                showSlide(currentSlide + n);
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });

            // Initialize slideshow
            showSlide(currentSlide);

            // Change slide every 5 seconds
            setInterval(nextSlide, 5000);
        }

        if ($window.location.hash == '#/events') {
            $scope.eventsJS();
        }
        
        // Fetch paginated data
        $scope.fetchData = function (page) {
            $http.get('http://127.0.0.1:8001/api/v1/events', {
                params: {
                    sort: $scope.sort,
                    date: $scope.date,
                    category: $scope.selectedCategory,
                    search: $scope.searchQuery,
                    page: page,
                    per_page: $scope.itemsPerPage
                }
            }).then(function (response) {
                $scope.items = response.data.data;
                $scope.currentPage = response.data.meta.current_page;
                $scope.totalPages = response.data.meta.last_page;

                // Generate page numbers
                $scope.pages = [];
                for (let i = 1; i <= $scope.totalPages; i++) {
                    $scope.pages.push(i);
                }
            }, function (error) {
                console.error("Error fetching data", error);
            });
        };

        // Initialize
        $scope.fetchData($scope.currentPage);

        $http.get('http://127.0.0.1:8001/api/v1/events').then(function(response){
            $scope.datas = response.data.data;
        });
    
        $http.get('http://127.0.0.1:8001/api/v1/events/' + $scope.eventId).then(function(response){
            $scope.data = response.data.events;
            $scope.formData = {
                title : $scope.data.attributes.title ,
                place : $scope.data.attributes.place,
                category : $scope.data.attributes.category,
                day : $scope.data.attributes.day,
                date  : $scope.data.attributes.date,
                message  : $scope.data.attributes.message,
                sub_message  : $scope.data.attributes.sub_message,
                author_1  : $scope.data.attributes.author_1,
                job_author_1  : $scope.data.attributes.job_author_1,
                author_2  : $scope.data.attributes.author_2,
                job_author_2  : $scope.data.attributes.job_author_2,
                image  : $scope.data.attributes.image,
                header  : $scope.data.attributes.header,
                body : $scope.data.attributes.body 
            };
            $scope.Data = true;
        });

        // Create event
        $scope.createEvent = function() {
            EventsService.createEvent($scope.formDataCreate).then(function(response) {
                alert('Event created successfully!');
                $window.location.href = '#/list-event';
            }).catch(function(error) {
                alert('Error creating event: ' + JSON.stringify(error.data.errors));
            });
        };

        // Update event
        $scope.updateEvent = function(eventId) {
            EventsService.updateEvent(eventId, $scope.formData).then(function(response) {
                alert('Event updated successfully!');
                $window.location.href = '#/list-event';
            }).catch(function(error) {
                alert('Error updating event: ' + JSON.stringify(error.data.errors));
            });
        };

        // Delete event
        $scope.deleteEvent = function(eventId) {
            if (confirm('Are you sure you want to delete this event?')) {
                EventsService.deleteEvent(eventId).then(function(response) {
                    alert('Event deleted successfully');
                    $route.reload();
                }).catch(function(error) {
                    alert('Error deleting event: ' + JSON.stringify(error.data.errors));
                });
            }
        };
}]);