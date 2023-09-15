var navBar = document.getElementById("nav-bar");



function toggleBtn(){
    navBar.classList.toggle("hide-menu");
}

function toggleFilter2() {
    event.preventDefault(); 
    const filter2Elements = document.querySelectorAll('.filter2');
    const filter2H3 = document.querySelector('.filter2-h3');

    filter2Elements.forEach((element) => {
      element.style.display = 'flex'; 
    });

    filter2H3.style.display = 'flex'; 

    
    const viewMoreLink = document.querySelector('.sidebar-link');
    viewMoreLink.style.display = 'none';
  }

  
  const viewMoreLink = document.querySelector('.sidebar-link a');
  viewMoreLink.addEventListener('click', toggleFilter2);





document.addEventListener("DOMContentLoaded", function () {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[?&]" + name + "=([^&]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Get the 'column' parameter from the URL
    var columnParam = getUrlParameter("column");

    // Hide all destination columns by default
    var destinationColumns = document.querySelectorAll(".destination-column");
    destinationColumns.forEach(function (column) {
        column.style.display = "none";
    });

    // Display the appropriate column based on the 'column' parameter
    var selectedColumn = document.querySelector("." + columnParam + "-col");
    if (selectedColumn) {
        selectedColumn.style.display = "inline-block";
    }

});






// Define an array of selectors for house listings
const houseListingSelectors = [
    '.london-col .house',
    '.switzerland-col .house',
    '.australia-col .house',
    '.greece-col .house',
    '.amsterdam-col .house',
    '.netherlands-col .house',
    '.new-york-col .house',
    '.chicago-col .house',
    '.san-francisco-col .house',
    '.shanghai-col .house',
    '.islamabad-col .house',
    '.dubai-col .house'
];

// Create an array to store the corresponding houseListings
const houseListingsArray = houseListingSelectors.map(selector => document.querySelectorAll(selector));

// Get references to the filter checkboxes and house listings
const filterCheckboxes = document.querySelectorAll('.side-bar input[type="checkbox"]');
const noResultsMessage = document.getElementById('no-results-message'); // Add a message element

// Function to update the visibility of house listings based on filters
function updateHouseListings() {
    const selectedHouseTypes = Array.from(filterCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    let noResults = true; // Assume there are no results initially

    houseListingsArray.forEach((houseListings, index) => {
        houseListings.forEach(house => {
            const houseSpanId = house.querySelector('p span').id;
            const isVisibleHouseType = selectedHouseTypes.length === 0 || selectedHouseTypes.includes(houseSpanId);

            // Filter by amenities if there's a house type match
            if (isVisibleHouseType) {
                const selectedAmenities = Array.from(document.querySelectorAll('.filter2 input[type="checkbox"]:checked'))
                    .map(checkbox => checkbox.id);

                const amenitySpans = house.querySelectorAll('p span');
                const amenityIds = Array.from(amenitySpans).map(span => span.id);

                const isVisibleAmenities = selectedAmenities.length === 0 || selectedAmenities.every(amenity => amenityIds.includes(amenity));

                house.style.display = isVisibleAmenities ? 'flex' : 'none';

                if (isVisibleAmenities) {
                    noResults = false; // If any results are visible, set noResults to false
                }
            } else {
                house.style.display = 'none';
            }
        });
    });

    // Display the "No search results" message if no results are found
    noResultsMessage.style.display = noResults ? 'flex' : 'none';
    if (noResults) {
        noResultsMessage.style.color = '#333';
        noResultsMessage.style.fontWeight = '500';
        noResultsMessage.style.textAlign = 'center';
    }
}

// Add event listeners to the filter checkboxes
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateHouseListings);
});

// Initially, update the house listings to match the initial checkbox states
updateHouseListings();






