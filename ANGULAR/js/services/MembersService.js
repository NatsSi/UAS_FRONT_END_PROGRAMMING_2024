angular.module('MembersService', [])
    .factory('MembersService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8001/api/v1';

        return {
            createEvent: function(data) {
                return $http.post(`${baseUrl}/create-members`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            updateEvent: function(memberId, data) {
                return $http.put(`${baseUrl}/members/${memberId}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            deleteEvent: function(memberId) {
                return $http.delete(`${baseUrl}/members/${memberId}`);
            }
        };
    }]);