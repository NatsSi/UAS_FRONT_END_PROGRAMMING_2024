angular.module('EventsService', [])
    .factory('EventsService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8001/api/v1';

        return {
            createEvent: function(data) {
                return $http.post(`${baseUrl}/create-event`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            updateEvent: function(eventId, data) {
                return $http.put(`${baseUrl}/events/${eventId}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            deleteEvent: function(eventId) {
                return $http.delete(`${baseUrl}/events/${eventId}`);
            }
        };
    }]);