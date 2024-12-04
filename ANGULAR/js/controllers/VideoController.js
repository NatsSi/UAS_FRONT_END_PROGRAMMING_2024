angular.module('VideoController', ['VideoService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('VideoController', ['$scope', '$http', '$window', '$route', '$routeParams', 'VideoService', function ($scope, $http, $window, $route, $routeParams, VideoService) {
        
        // Variabel untuk menyimpan data video dan form input
        $scope.videos = [];
        $scope.formData = {};
        $scope.formDataUpdated = {};
        $scope.searchQuery = ''; // Pencarian berdasarkan judul, publisher, dll.
        $scope.selectedType = ''; // Penyaringan berdasarkan jenis video
        $scope.sortOrder = 'asc'; // Urutan pengurutan berdasarkan tanggal unggah, default ascending
        
        // Pagination variables
        $scope.currentPage = 1; // Halaman saat ini
        $scope.pageSize = 3; // Jumlah video per halaman
        $scope.totalPages = 1; // Total halaman, akan dihitung berdasarkan jumlah video

        // Ambil ID video dari parameter URL
        var videoId = $routeParams.id;

        // Fungsi untuk mengambil semua video dari server
        $scope.getVideos = function () {
            VideoService.getVideos().then(function (response) {
                $scope.videos = response.data.data;
                
                // Menyalin created_at ke upload_date
                $scope.videos.forEach(function (video) {
                    video.upload_date = video.created_at; // Pastikan `created_at` diubah menjadi `upload_date`
                });

                $scope.filteredVideos = $scope.videos; // Set filteredVideos untuk video yang belum disaring
                $scope.totalPages = Math.ceil($scope.filteredVideos.length / $scope.pageSize); // Hitung total halaman
                $scope.paginateVideos(); // Menampilkan video berdasarkan halaman saat ini
            }, function (error) {
                alert('Gagal mengambil data video.');
            });
        };

        // Fungsi untuk mencari video berdasarkan query (judul, publisher, jenis)
        $scope.searchVideos = function () {
            const query = $scope.searchQuery.toLowerCase();
            $scope.filteredVideos = $scope.videos.filter(function (video) {
                const titleMatch = video.title && video.title.toLowerCase().includes(query);
                const publisherMatch = video.publisher && video.publisher.toLowerCase().includes(query);
                const typeMatch = $scope.selectedType ? video.type === $scope.selectedType : true;
                return (titleMatch || publisherMatch) && typeMatch;
            });
            $scope.sortVideos(); // Mengurutkan setelah penyaringan
            $scope.totalPages = Math.ceil($scope.filteredVideos.length / $scope.pageSize); // Update total halaman
            $scope.paginateVideos(); // Menampilkan video berdasarkan halaman saat ini
        };

        // Fungsi untuk mengurutkan video berdasarkan tanggal upload
        $scope.sortVideos = function () {
            $scope.filteredVideos.sort(function (a, b) {
                const dateA = new Date(a.upload_date); // Mengonversi string tanggal menjadi objek Date
                const dateB = new Date(b.upload_date);
                if ($scope.sortOrder === 'asc') {
                    return dateA - dateB; // Urutan ascending
                } else {
                    return dateB - dateA; // Urutan descending
                }
            });
        };

        // Fungsi untuk menampilkan video berdasarkan halaman saat ini
        $scope.paginateVideos = function () {
            const startIndex = ($scope.currentPage - 1) * $scope.pageSize;
            const endIndex = startIndex + $scope.pageSize;
            $scope.currentPageVideos = $scope.filteredVideos.slice(startIndex, endIndex);
        };

        // Fungsi untuk berpindah ke halaman berikutnya
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.totalPages) {
                $scope.currentPage++;
                $scope.paginateVideos();
            }
        };

        // Fungsi untuk berpindah ke halaman sebelumnya
        $scope.previousPage = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                $scope.paginateVideos();
            }
        };

        // Panggilan awal untuk mengambil semua video
        $scope.getVideos();

        // Memantau perubahan pada pencarian dan urutan
        $scope.$watchGroup(['searchQuery', 'selectedType', 'sortOrder'], function () {
            $scope.searchVideos(); // Lakukan pencarian dan penyaringan ulang
        });

        $scope.uploadVideo = function () {
            VideoService.uploadVideo($scope.formData)
                .then(function (response) {
                    alert('Video has been uploaded sucessfully!');
                    $window.location.href = "#/list-video";
                })
                .catch(function (error) {
                    let errorMessages = 'Error Uploading Video';
                    angular.forEach(error.data.errors, function (messages, field) {
                        angular.forEach(messages, function (message) {
                            errorMessages += message + '\n';
                        });
                    });
                    alert(errorMessages);
                });
        };

        // Fungsi untuk update video
        $scope.updateVideo = function() {
            console.log('Updating video with id:', videoId); // Pastikan id diterima dengan benar
            VideoService.updateVideo(videoId, $scope.formDataUpdated).then(function(response) {
                alert('Video updated successfully!');
                $window.location.href = '#/list-video';  // Redirect ke daftar video
            }).catch(function(error) {
                console.error('Error updating video:', error);
                alert('Error updating video: ' + (error.data && error.data.errors ? JSON.stringify(error.data.errors) : error.message || 'Unknown error'));
            });
        };


        $scope.deleteVideo = function(videoId) {
            if (confirm('Are you sure you want to delete this video?')) {
                VideoService.deleteVideo(videoId).then(function(response) {
                    alert('Video deleted successfully');
                    $route.reload();
                }).catch(function(error) {
                    alert('Error deleting video: ' + JSON.stringify(error.data.errors));
                });
            }
        };
    }]);
