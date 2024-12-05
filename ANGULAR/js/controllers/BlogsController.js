angular.module('BlogsController', ['BlogsService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('BlogsController', ['$scope', '$http', '$window', '$route', '$routeParams', 'BlogsService', function ($scope, $http, $window, $route, $routeParams, BlogsService) {
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
    
        $http.get('http://127.0.0.1:8001/api/v1/blogs/' + $scope.blogId).then(function(response){
            $scope.data = response.data.blogs;
            $scope.formData = {
                title : $scope.data.attributes.title ,
                category : $scope.data.attributes.category,
                date  : $scope.data.attributes.date,
                sub_message  : $scope.data.attributes.sub_message,
                author_1  : $scope.data.attributes.author_1,
                job_author_1  : $scope.data.attributes.job_author_1,
                image  : $scope.data.attributes.image,
                section1_title : $scope.data.attributes.section1_title,
                section1_content : $scope.data.attributes.section1_content, 
                section2_title : $scope.data.attributes.section2_title, 
                section2_content : $scope.data.attributes.section2_content, 
                section3_content : $scope.data.attributes.section3_content,
                section3_title : $scope.data.attributes.section3_title, 
            };
            $scope.Data = true;
        });

        // Create blog
        $scope.createBlog = function() {
            BlogsService.createBlog($scope.formDataCreate).then(function(response) {
                alert('Blog created successfully!');
                $window.location.href = '#/list-blog';
            }).catch(function(error) {
                alert('Error creating blog: ' + JSON.stringify(error.data.errors));
            });
        };

        // Update blog
        $scope.updateBlog = function(blogId) {
            BlogsService.updateBlog(blogId, $scope.formData).then(function(response) {
                alert('Blog updated successfully!');
                $window.location.href = '#/list-blog';
            }).catch(function(error) {
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
}]);