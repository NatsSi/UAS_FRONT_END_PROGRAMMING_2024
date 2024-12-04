angular.module('VideoService', [])
    .factory('VideoService', ['$http', 'CSRF_TOKEN', function($http, CSRF_TOKEN) {
        const baseUrl = 'http://127.0.0.1:8000/api/v1';

        return {
            // Mengambil daftar video
            getVideos: function() {
                return $http.get(`${baseUrl}/list-videos`);
            },

            getVideo: function(videoId) {
                return $http.get(`${baseUrl}/list-videos/${videoId}`);
            },

            // Mengunggah video baru
            uploadVideo: function(data) {
                console.log('VideoService: updating video with id:', data); 
                return $http.post(`${baseUrl}/add-video`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },

            // Mengupdate video (jika perlu, misalnya untuk edit video)
            updateVideo: function(videoId, data) {
                console.log('VideoService: updating video with id:', videoId); // Debugging id yang diterima
                return $http.put(`${baseUrl}/list-videos-update/${videoId}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    }
                });
            },

            // Menghapus video
            deleteVideo: function(videoId) {
                return $http.delete(`${baseUrl}/list-videos/${videoId}`);
            }
        };
    }]);
