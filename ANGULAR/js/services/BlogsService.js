angular.module('BlogsService', [])
    .factory('BlogsService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8001/api/v1';

        return {
            createBlog: function(data) {
                return $http.post(`${baseUrl}/blogs`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            updateBlog: function(blogId, data) {
                return $http.put(`${baseUrl}/blogs/${blogId}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            deleteBlog: function(blogId) {
                return $http.delete(`${baseUrl}/blogs/${blogId}`);
            }
        };
    }]);