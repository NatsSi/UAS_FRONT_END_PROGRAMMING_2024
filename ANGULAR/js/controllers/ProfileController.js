angular.module('ProfileController', ['ProfileService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('ProfileController', ['$scope', '$http', '$window', '$route', '$routeParams', 'ProfileService', 
        function($scope, $http, $window, $route, $routeParams, ProfileService) {
            
            // Tangkap email dari URL (bukan id)
            const memberEmail = $routeParams.email;

            console.log("Received memberEmail:", memberEmail);

            // State untuk menyimpan data member
            $scope.member = {};

            // Ambil data member dari API berdasarkan email
            ProfileService.getMemberByEmail(memberEmail)
                .then(function(response) {
                    $scope.member = response.data.members.attributes; 
                    console.log("Mapped Member Data:", $scope.member);
                })
                .catch(function(error) {
                    console.error('Error fetching member data:', error);
                    alert('Gagal memuat data profil!');
                });

            // Fungsi untuk logout (opsional)
            $scope.logout = function() {
                alert('Logout berhasil!');
                $window.location.href = '/'; // Redirect ke halaman utama
            };
        }
    ]);
