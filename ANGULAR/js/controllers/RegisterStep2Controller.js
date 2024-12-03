angular.module('RegisterStep2Controller', ['MembersService'])
    .constant("CSRF_TOKEN", '{{ csrf_token() }}')
    .controller('RegisterStep2Controller', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

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
                // Retrieve email, password, and selected plan
                const email = $scope.email || ''; // Replace with actual email field binding
                const password = $scope.password || ''; // Replace with actual password field binding
                const subscriptionPlan = activeCard.name;

                // Redirect to the next step with query parameters
                const queryString = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&subscription_plan=${encodeURIComponent(subscriptionPlan)}`;
                $window.location.href = `#/register-step-3${queryString}`;
            } else {
                alert("Please select a subscription plan before proceeding.");
            }
        };
    }]);
