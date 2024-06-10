document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchTerm = document.querySelector('#search').value.trim();
    window.location.href = 'search-result.html?search=' + encodeURIComponent(searchTerm);
});

document.addEventListener('DOMContentLoaded', function () {
// Parsing URL parameters to get search term
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

if (searchTerm) {
    // Fetch index.html
    fetch('about.html')
        .then(response => response.text())
        .then(data => {
            // Create a temporary DOM element to parse the fetched HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // Select the .dataVisual section
            const dataVisualSection = tempDiv.querySelector('.dataVisual');

            // Function to search for elements with matching section titles
            function searchByTitle(searchTerm) {
                const containers = dataVisualSection.querySelectorAll('.container');
                const searchResults = [];

                containers.forEach(container => {
                    const titleElement = container.querySelector('.section-title');
                    if (titleElement) {
                        const title = titleElement.textContent.trim().toLowerCase();
                        // Using regular expression to match case-insensitive and partial search
                        const regex = new RegExp(searchTerm.toLowerCase(), 'i');
                        if (regex.test(title)) {
                            searchResults.push(container.innerHTML);
                        }
                    }
                });

                return searchResults;
            }

            // Display search results
            const searchResults = searchByTitle(searchTerm);
            const searchResultsContainer = document.getElementById('searchResults');
            if (searchResults.length > 0) {
                searchResultsContainer.innerHTML = searchResults.join('');
            } else {
                searchResultsContainer.innerHTML = '<p>No matching results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching index.html:', error);
        });
}
});