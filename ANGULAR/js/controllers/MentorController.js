angular.module('MentorController', ['MentorService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('MentorController', ['$scope', '$http', '$window', '$route', '$routeParams', 'MentorService', function ($scope, $http, $window, $route, $routeParams, MentorService) {

        // Inisialisasi nilai filter, pencarian, dan halaman
        $scope.searchQuery = '';
        $scope.selectedRole = '';
        $scope.sortBy = 'rating';  // Default sorting
        $scope.currentPage = 1;
        $scope.pageSize = 3;

        // Fungsi untuk mengambil data mentor dari API
        $scope.getMentors = function() {
            MentorService.getMentors($scope.searchQuery, $scope.selectedRole, $scope.sortBy, $scope.currentPage, $scope.pageSize).then(function(response) {
                $scope.mentors = response.data.data;  // Mendapatkan data mentor dari API
                $scope.totalMentors = response.data.total;  // Mendapatkan total mentor untuk pagination
                
                // Menghitung total halaman berdasarkan total mentor dan pageSize
                $scope.totalPages = Math.ceil($scope.totalMentors / $scope.pageSize);
            }, function(error) {
                console.error("Error fetching mentors:", error);
            });
        };

        // Panggil fungsi untuk mengambil mentor saat controller dimuat
        $scope.getMentors();

        // Fungsi untuk mengubah halaman
        $scope.changePage = function(page) {
            if (page >= 1 && page <= $scope.totalPages) {
                $scope.currentPage = page;
                $scope.getMentors();
            }
        };

        // Fungsi untuk mengetahui apakah tombol Next bisa diaktifkan
        $scope.canGoNext = function() {
            return $scope.currentPage < $scope.totalPages;
        };

        // Fungsi untuk mengetahui apakah tombol Previous bisa diaktifkan
        $scope.canGoPrevious = function() {
            return $scope.currentPage > 1;
        };
    }]);
