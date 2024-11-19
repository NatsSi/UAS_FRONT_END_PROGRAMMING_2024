        // Function to get query parameter from URL
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // Get the 'email' parameter from the URL
        const email = getQueryParam('email');

        // Set the email input value if email exists
        if (email) {
            document.getElementById('email').value = decodeURIComponent(email);
        } else {
            console.error("Email parameter not found in URL.");
        }