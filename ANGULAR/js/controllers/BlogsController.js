angular.module('BlogsController', ['BlogsService'])
    .constant("IMAGE_BASE_URL", "http://127.0.0.1:8001/storage/images/")
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('BlogsController', ['$scope', '$http', '$window', '$route', '$routeParams', 'BlogsService', 'IMAGE_BASE_URL', function ($scope, $http, $window, $route, $routeParams, BlogsService, IMAGE_BASE_URL) {

        $scope.formData = {}; //Untuk Read & Update
        $scope.formDataCreate = {}; //Untuk Create
        $scope.data = {}; //Untuk Read
        $scope.Data = false; //Untuk apakah data sudah ada atau belum
        $scope.blogId = $routeParams.id; //Untuk Read, Update & Delete
        //$scope.blogId = localStorage.getItem('blogId'); 
        $scope.items = []; //Untuk menyimpan response

        //Pagination
        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.itemsPerPage = 3;

        //Filter
        $scope.categories = ['Health','Entertainment','Educative']; // List kategori
        $scope.selectedCategory = ""; // Kategori terpilih


        //Search
        $scope.searchQuery = ''; // Search query
        $scope.date = null;

        //Sort
        $scope.sort = '';

        $scope.isNewestDisabled = true; // Initial status for Newest
        $scope.isOldestDisabled = false; // Initial status for Oldest

        $scope.sort = 'asc'; // Default sorting (newest)


        $scope.toggleDisable = function(button) {
            if (button === 'newest') {
                $scope.isNewestDisabled = true; 
                $scope.isOldestDisabled = false;
                $scope.sort = 'asc';  
                $scope.fetchData(); 
            } else if (button === 'oldest') {
                $scope.isOldestDisabled = true;  
                $scope.isNewestDisabled = false; 
                $scope.sort = 'desc'; 
                $scope.fetchData(); 
            }
        };

        
        $scope.blogsJS = function() {
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
        }

        if ($window.location.hash == '#/blogs') {
            $scope.blogsJS();
        }
        
        // Fetch paginated data
        $scope.fetchData = function (page) {
            $http.get('http://127.0.0.1:8001/api/v1/blogs', {
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

        $http.get('http://127.0.0.1:8001/api/v1/blogs').then(function(response){
            $scope.datas = response.data.data;
        });
    
        $http.get('http://127.0.0.1:8001/api/v1/blogs/' + $scope.blogId).then(function(response) {
            const blogData = response.data.blogs;
        
            // Replace 'undefined' strings with null
            $scope.formData = {
                title: blogData.attributes.title,
                category: blogData.attributes.category,
                date: blogData.attributes.date ,
                sub_message: blogData.attributes.sub_message === 'undefined' ? null : blogData.attributes.sub_message,
                author_1: blogData.attributes.author_1 === 'undefined' ? null : blogData.attributes.author_1,
                job_author_1: blogData.attributes.job_author_1 === 'undefined' ? null : blogData.attributes.job_author_1,
                image: blogData.attributes.image ? (IMAGE_BASE_URL + blogData.attributes.image) : null,
                section1_title: blogData.attributes.section1_title === 'undefined' ? null : blogData.attributes.section1_title,
                section1_content: blogData.attributes.section1_content === 'undefined' ? null : blogData.attributes.section1_content,
                section2_title: blogData.attributes.section2_title === 'undefined' ? null : blogData.attributes.section2_title,
                section2_content: blogData.attributes.section2_content === 'undefined' ? null : blogData.attributes.section2_content,
                section3_title: blogData.attributes.section3_title === 'undefined' ? null : blogData.attributes.section3_title,
                section3_content: blogData.attributes.section3_content === 'undefined' ? null : blogData.attributes.section3_content,
                conclusion: blogData.attributes.conclusion === 'undefined' ? null : blogData.attributes.conclusion
            };
        
            console.log("Image name from backend:", blogData.attributes.image);
            $scope.Data = true; // Indicate data is ready
        }).catch(function(error) {
            console.error("Error fetching blog details:", error);
        });
        
        
        // Create blog
            $scope.createBlog = function() {
            var formData = new FormData();
            formData.append('title', $scope.formDataCreate.title);
            formData.append('category', $scope.formDataCreate.category);
            formData.append('date', $scope.formDataCreate.date);
            formData.append('sub_message', $scope.formDataCreate.sub_message);
            formData.append('author_1', $scope.formDataCreate.author_1);
            formData.append('job_author_1', $scope.formDataCreate.job_author_1);
            formData.append('section1_title', $scope.formDataCreate.section1_title);
            formData.append('section1_content', $scope.formDataCreate.section1_content);
            formData.append('section2_title', $scope.formDataCreate.section2_title);
            formData.append('section2_content', $scope.formDataCreate.section2_content);
            formData.append('section3_title', $scope.formDataCreate.section3_title);
            formData.append('section3_content', $scope.formDataCreate.section3_content);
            formData.append('conclusion', $scope.formDataCreate.conclusion);

            // Manually append the file input
            var imageFile = document.getElementById('image').files[0];
            if (imageFile) {
                formData.append('image', imageFile);
            }

             // Send the FormData to the backend
            $http.post('http://127.0.0.1:8001/api/v1/blogs', formData, {
                headers: {
                    'Content-Type': undefined, // Let the browser set the correct content type for FormData
                    'X-CSRF-TOKEN': $scope.CSRF_TOKEN
                }
            }).then(function(response) {
                alert('Blog created successfully!');
                $window.location.href = '#/list-blog';
            }).catch(function(error) {
                alert('Error creating blog: ' + JSON.stringify(error.data.errors));
            });
    };


        // Update blog
        $scope.updateBlog = function(blogId) {
            blogId = $scope.blogId;
            if (!blogId) {
                console.error("Blog ID is missing!");
                return;
            }
        
            var formData = new FormData();
            formData.append('title', $scope.formData.title);
            formData.append('category', $scope.formData.category);
            formData.append('date', $scope.formData.date);
            formData.append('sub_message', $scope.formData.sub_message);
            formData.append('author_1', $scope.formData.author_1);
            formData.append('job_author_1', $scope.formData.job_author_1);
            formData.append('section1_title', $scope.formData.section1_title);
            formData.append('section1_content', $scope.formData.section1_content);
            formData.append('section2_title', $scope.formData.section2_title);
            formData.append('section2_content', $scope.formData.section2_content);
            formData.append('section3_title', $scope.formData.section3_title);
            formData.append('section3_content', $scope.formData.section3_content);
            formData.append('conclusion', $scope.formData.conclusion);
        
            // Log FormData entries for debugging
            for (var pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]); // This will log each key-value pair in the FormData object
            }
        
            // Append the image only if it has been updated
            var imageFile = document.getElementById('image').files[0];
            if (imageFile) {
                console.log("Image file selected:", imageFile); // Log the selected image file
                formData.append('image', imageFile);
            } else {
                console.log("No image file selected.");
            }
        
            // Call the BlogsService to update the blog
            BlogsService.updateBlog($scope.blogId, formData).then(function(response) {
                alert('Blog updated successfully!');
                $window.location.href = '#/';
            }).catch(function(error) {
                console.error('Error updating blog:', error);
                alert('Error updating blog: ' + JSON.stringify(error.data.errors));
            });
        };
        

        // Delete blog
        $scope.deleteBlog = function(blogId) {
            if (confirm('Are you sure you want to delete this blog?')) {
                BlogsService.deleteBlog(blogId).then(function(response) {
                    alert('Blog deleted successfully');
                    $route.reload();
                }).catch(function(error) {
                    alert('Error deleting blog: ' + JSON.stringify(error.data.errors));
                });
            }
        };
        
        // Get today's date
        $scope.getToday = function() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            var yyyy = today.getFullYear();
            return yyyy + '-' + mm + '-' + dd;
        };

        // Initialize the date in the form data
        $scope.formDataCreate = {
            date: $scope.getToday()
        };
}]);