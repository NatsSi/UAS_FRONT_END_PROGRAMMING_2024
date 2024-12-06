angular.module('ProfileService', [])
    .factory('ProfileService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8001/api/v1';

        return {
            // Fungsi untuk mendapatkan data member berdasarkan email
            getMemberByEmail: function(memberEmail) {
                return $http.get(`${baseUrl}/members/email/${memberEmail}`, {
                    headers: {
                        'X-CSRF-TOKEN': CSRF_TOKEN
                    }
                }).then(function (response) {
                    console.log('API Response:', response.data); // Debug respons
                    return response;
                });
            }
        };
    }]);
