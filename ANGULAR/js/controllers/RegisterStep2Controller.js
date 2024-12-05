angular.module('RegisterStep2Controller', ['MembersService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('RegisterStep2Controller', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
 const queryParams = $location.search();
$scope.email = queryParams.email || ''; 
$scope.password = queryParams.password || ''; 
        
console.log('Email in Step 2:', $scope.email);
console.log('Password in Step 2:', $scope.password);
         
        $scope.cards = [
            {
                id: 1,
                name: 'Zen Starter',
                price: '$10',
                description: 'Designed for beginners, offering curated yoga classes.',
                features: [
                    '5 Yoga Classes',
                    'Online Community',
                    'Meditation Sessions'
                ],
                active: false
            },
            {
                id: 2,
                name: 'Energy Booster',
                price: '$18',
                description: 'Focuses on dynamic programs for increased energy.',
                features: [
                    '10 Yoga Classes',
                    'Monthly Workshops',
                    'Priority Access'
                ],
                active: false
            },
            {
                id: 3,
                name: 'Mindful Pro',
                price: '$24',
                description: 'Unlimited access to all yoga classes and workshops.',
                features: [
                    'Personal Coaching',
                    'Discounted Products',
                    'Access to All Features'
                ],
                active: false
            },
            {
                id: 4,
                name: 'Ultimate Zen',
                price: '$32',
                description: 'A premium yoga experience with exclusive benefits.',
                features: [
                    'Private Yoga Sessions',
                    'Unlimited Classes',
                    'Chat Support'
                ],
                active: false
            }
        ];

        // Function to select a card
        $scope.selectCard = function(card) {
            // Set all cards to inactive
            $scope.cards.forEach(function(c) {
                c.active = false;
            });
            // Mark the selected card as active
            card.active = true;
        };

        // Function to submit the form
        $scope.submitForm = function() {
            const activeCard = $scope.cards.find(card => card.active);
            if (activeCard) {
                const email = $scope.email || '';
                const password = $scope.password || '';
                const subscription_type = activeCard.name;
        
                const queryString = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&subscription_plan=${encodeURIComponent(subscription_type)}`;
                $window.location.href = `#/register-step-3${queryString}`;
                console.log('Redirecting to Step 3 with:', queryString);
            } else {
                alert("Please select a subscription plan before proceeding.");
            }
        };
        
    }]);
