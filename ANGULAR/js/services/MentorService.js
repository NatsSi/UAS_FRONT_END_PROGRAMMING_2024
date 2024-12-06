angular.module('MentorService', [])
    .factory('MentorService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8001/api/v1';

        return {
            getMentors: function(searchQuery, selectedRole, sortBy, currentPage, pageSize) {
                const params = {
                    search: searchQuery || '',
                    role: selectedRole || '',
                    sort_by: sortBy || 'rating',
                    page: currentPage || 1,
                    page_size: pageSize || 3
                };
                return $http.get(`${baseUrl}/mentors`, { params: params });
            }
        }
    }]);
