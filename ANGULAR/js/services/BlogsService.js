angular.module('BlogsService', [])
    .factory('BlogsService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8001/api/v1';

        return {
            createBlog: function(data) {
                return $http.post(`${baseUrl}/blogs`, data, {
                    headers: {
                        'Content-Type': undefined,
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },
            updateBlog: function(blogId, data) {
                console.log("Updating blog with ID:", blogId);
                console.log("Data being sent:", data);
                return $http.put(`${baseUrl}/blogs/${blogId}`, data, {
                    headers: {
                        'Content-Type': undefined,
                        'X-CSRF-TOKEN': CSRF_TOKEN
                    }
                }).then(function(response) {
                    console.log('Blog updated successfully:', response);
                    return response;
                }).catch(function(error) {
                    console.error('Error updating blog:', error);
                    throw error;
                });
            },
            
            deleteBlog: function(blogId) {
                return $http.delete(`${baseUrl}/blogs/${blogId}`);
            }
        };
    }]);