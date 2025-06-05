// assets/js/governmentVenturesFilter.js

document.addEventListener('DOMContentLoaded', function () {
    const projectItems = document.querySelectorAll('.service-item'); // Renamed from serviceItems for clarity
    const categoryDropdownMenu = document.getElementById('category-dropdown-menu');
    const stateDropdownMenu = document.getElementById('state-dropdown-menu'); // New ID for state dropdown
    const categorySelectedText = document.getElementById('category-selected-text');
    const stateSelectedText = document.getElementById('state-selected-text'); // New ID for state selected text
    const categoryFilterButton = document.getElementById('category-filter-button');
    const stateFilterButton = document.getElementById('state-filter-button'); // New ID for state filter button

    let selectedCategory = 'all';
    let selectedState = 'all'; // New variable for selected state

    // Function to populate dropdowns dynamically from project items or manually
    function populateDropdowns() {
        // --- START: Manual definition of categories (Type of Marketing) and States ---
        // These values MUST EXACTLY MATCH the data-category and data-state attributes in your HTML.
        const categories = new Set([
            'ATL Marketing', 'TTL Marketing', 'POS Marketing', 'B2B Marketing',
            'Exhibition', 'PR & Media', 'Brand Marketing', 'Entertainment Marketing',
            'Merchandise Marketing', 'Corporate Events', 'Government Ventures'
        ]);

        const states = new Set([
            "Uttar Pradesh", "Karnataka", "Maharashtra", "Gujarat", "Tamil Nadu",
            "Rajasthan", "West Bengal", "Delhi", "Madhya Pradesh", "Kerala", "Andhra Pradesh"
            // Add more states as needed for your projects
        ]);
        // --- END: Manual definition of categories and States ---

        const categoryList = categoryDropdownMenu.querySelector('ul');
        const stateList = stateDropdownMenu.querySelector('ul');

        // Clear existing options except 'All' and re-add 'All' to ensure it's always first
        categoryList.innerHTML = '<li data-filter="all">All</li>';
        stateList.innerHTML = '<li data-filter="all">All</li>';

        // Add unique categories to the category (Type of Marketing) dropdown
        categories.forEach(category => {
            const li = document.createElement('li');
            li.dataset.filter = category; // The value used for filtering
            li.textContent = category;    // The display text
            categoryList.appendChild(li);
        });

        // Add unique states to the state dropdown
        states.forEach(state => {
            const li = document.createElement('li');
            li.dataset.filter = state; // The value used for filtering
            li.textContent = state;    // The display text
            stateList.appendChild(li);
        });
    }

    // Function to filter project items based on selected category and state
    function filterProjectItems() {
        projectItems.forEach(item => {
            // Get category and state associated with the current project item
            const itemCategory = item.dataset.category ? item.dataset.category.trim() : ''; // Assuming single category per project
            const itemState = item.dataset.state ? item.dataset.state.trim() : ''; // Assuming single state per project

            // Check if the item matches the selected category or if 'All' is selected
            const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;
            
            // Check if the item matches the selected state or if 'All' is selected
            const stateMatch = selectedState === 'all' || itemState === selectedState;

            // Show or hide the item based on both category and state matches
            if (categoryMatch && stateMatch) {
                item.style.display = 'block'; // Show the item
            } else {
                item.style.display = 'none'; // Hide the item
            }
        });
    }

    // Function to toggle the visibility of a given dropdown menu
    function toggleDropdown(dropdownElement) {
        // Close the other dropdown if it's open to ensure only one is active at a time
        if (dropdownElement === categoryDropdownMenu) {
            stateDropdownMenu.classList.remove('active');
        } else {
            categoryDropdownMenu.classList.remove('active');
        }
        // Toggle the 'active' class for the clicked dropdown
        dropdownElement.classList.toggle('active');
    }

    // Event listener for the category (Type of Marketing) filter button
    categoryFilterButton.addEventListener('click', function () {
        toggleDropdown(categoryDropdownMenu);
    });

    // Event listener for the state filter button
    stateFilterButton.addEventListener('click', function () {
        toggleDropdown(stateDropdownMenu);
    });

    // Event listener for clicks within the category dropdown menu
    categoryDropdownMenu.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            selectedCategory = event.target.dataset.filter; // Update the selected category
            categorySelectedText.textContent = `Type of Marketing: ${event.target.textContent}`; // Update the displayed text
            categoryDropdownMenu.classList.remove('active'); // Close the dropdown
            filterProjectItems(); // Re-filter the project items
            // Update the 'selected' class for styling the active option
            categoryDropdownMenu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    // Event listener for clicks within the state dropdown menu
    stateDropdownMenu.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            selectedState = event.target.dataset.filter; // Update the selected state
            stateSelectedText.textContent = `State: ${event.target.textContent}`; // Update the displayed text
            stateDropdownMenu.classList.remove('active'); // Close the dropdown
            filterProjectItems(); // Re-filter the project items
            // Update the 'selected' class for styling the active option
            stateDropdownMenu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    // Global click listener to close dropdowns if clicked outside
    document.addEventListener('click', function (event) {
        // Check if the click was outside the category dropdown and its trigger elements
        if (!categoryDropdownMenu.contains(event.target) && event.target !== categoryFilterButton && event.target !== categorySelectedText && !categoryFilterButton.contains(event.target) && !categorySelectedText.contains(event.target)) {
            categoryDropdownMenu.classList.remove('active');
        }
        // Check if the click was outside the state dropdown and its trigger elements
        if (!stateDropdownMenu.contains(event.target) && event.target !== stateFilterButton && event.target !== stateSelectedText && !stateFilterButton.contains(event.target) && !stateSelectedText.contains(event.target)) {
            stateDropdownMenu.classList.remove('active');
        }
    });

    // Initial population of dropdowns and filtering when the page loads
    populateDropdowns();
    filterProjectItems();
});