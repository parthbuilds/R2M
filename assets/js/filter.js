document.addEventListener('DOMContentLoaded', function () {
    const serviceItems = document.querySelectorAll('.service-item');
    const categoryDropdownMenu = document.getElementById('category-dropdown-menu');
    const brandDropdownMenu = document.getElementById('brand-dropdown-menu');
    const categorySelectedText = document.getElementById('category-selected-text');
    const brandSelectedText = document.getElementById('brand-selected-text');
    const categoryFilterButton = document.getElementById('category-filter-button');
    const brandFilterButton = document.getElementById('brand-filter-button');

    let selectedCategory = 'all';
    let selectedBrand = 'all';

    // Function to populate dropdowns dynamically from service items
    function populateDropdowns() {
        // --- START: Manual definition of categories and brands ---
        // If you want to manually define categories, uncomment and modify this line:
        const categories = new Set(['ATL Marketing', 'TTL Marketing', 'POS Marketing', 'B2B Marketing', 'Exhibition', 'Pr and Media', 'Brand Marketing', 'Entertainment Marketing', 'Merchandise Marketing', 'Corporate Events', 'Government Ventures']);

        // If you want to manually define brands, uncomment and modify this line:
        const brands = new Set([
            "ABInBev", "Bacardi", "Beam Global", "Castrol", "Coca-Cola", "Exxon Mobil", "Kelloggs", "Marks", "Philips", "Sangam", "SGMA", "Shell", "SSB Homes", "Whirlpool", "Zydus", "Amul", "Honesty Uniforms", "Mahaveer Textiles", "Pepsi"
        ]);
        // --- END: Manual definition of categories and brands ---

        // If you still want to extract from data attributes AND add manual ones,
        // you would keep the serviceItems.forEach loop and then add to the Sets.
        // For example:
        /*
        serviceItems.forEach(item => {
            if (item.dataset.category) {
                item.dataset.category.split(',').forEach(cat => categories.add(cat.trim()));
            }
            if (item.dataset.brands) {
                item.dataset.brands.split(',').forEach(brand => brands.add(brand.trim()));
            }
        });
        */

        const categoryList = categoryDropdownMenu.querySelector('ul');
        const brandList = brandDropdownMenu.querySelector('ul');

        // Clear existing options except 'All' and re-add 'All' to ensure it's always first
        categoryList.innerHTML = '<li data-filter="all">All</li>';
        brandList.innerHTML = '<li data-filter="all">All</li>';

        // Add unique categories to the category dropdown
        categories.forEach(category => {
            const li = document.createElement('li');
            li.dataset.filter = category;
            // Format text for display (e.g., "atl_marketing" becomes "Atl Marketing")
            li.textContent = category.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            categoryList.appendChild(li);
        });

        // Add unique brands to the brand dropdown
        brands.forEach(brand => {
            const li = document.createElement('li');
            li.dataset.filter = brand;
            // Format text for display (e.g., "brand_a" becomes "Brand A")
            li.textContent = brand.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            brandList.appendChild(li);
        });
    }

    // Function to filter service items based on selected category and brand
    function filterServiceItems() {
        serviceItems.forEach(item => {
            // Get categories and brands associated with the current service item
            const itemCategories = item.dataset.category ? item.dataset.category.split(',').map(c => c.trim()) : [];
            const itemBrands = item.dataset.brands ? item.dataset.brands.split(',').map(b => b.trim()) : [];

            // Check if the item matches the selected category or if 'All' is selected
            const categoryMatch = selectedCategory === 'all' || itemCategories.includes(selectedCategory);
            // Check if the item matches the selected brand or if 'All' is selected
            const brandMatch = selectedBrand === 'all' || itemBrands.includes(selectedBrand);

            // Show or hide the item based on both category and brand matches
            if (categoryMatch && brandMatch) {
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
            brandDropdownMenu.classList.remove('active');
        } else {
            categoryDropdownMenu.classList.remove('active');
        }
        // Toggle the 'active' class for the clicked dropdown
        dropdownElement.classList.toggle('active');
    }

    // Event listener for the category filter button (icon button)
    categoryFilterButton.addEventListener('click', function () {
        toggleDropdown(categoryDropdownMenu);
    });

    // Event listener for the brand filter button (icon button)
    brandFilterButton.addEventListener('click', function () {
        toggleDropdown(brandDropdownMenu);
    });

    // Event listener for clicks within the category dropdown menu
    categoryDropdownMenu.addEventListener('click', function (event) {
        // Check if the clicked element is an LI item
        if (event.target.tagName === 'LI') {
            selectedCategory = event.target.dataset.filter; // Update the selected category
            categorySelectedText.textContent = `Category: ${event.target.textContent}`; // Update the displayed text
            categoryDropdownMenu.classList.remove('active'); // Close the dropdown
            filterServiceItems(); // Re-filter the service items
            // Update the 'selected' class for styling the active option
            categoryDropdownMenu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    // Event listener for clicks within the brand dropdown menu
    brandDropdownMenu.addEventListener('click', function (event) {
        // Check if the clicked element is an LI item
        if (event.target.tagName === 'LI') {
            selectedBrand = event.target.dataset.filter; // Update the selected brand
            brandSelectedText.textContent = `Brand: ${event.target.textContent}`; // Update the displayed text
            brandDropdownMenu.classList.remove('active'); // Close the dropdown
            filterServiceItems(); // Re-filter the service items
            // Update the 'selected' class for styling the active option
            brandDropdownMenu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    // Global click listener to close dropdowns if clicked outside
    document.addEventListener('click', function (event) {
        // Check if the click was outside the category dropdown and its trigger elements
        if (!categoryDropdownMenu.contains(event.target) && event.target !== categoryFilterButton && event.target !== categorySelectedText) {
            categoryDropdownMenu.classList.remove('active');
        }
        // Check if the click was outside the brand dropdown and its trigger elements
        if (!brandDropdownMenu.contains(event.target) && event.target !== brandFilterButton && event.target !== brandSelectedText) {
            brandDropdownMenu.classList.remove('active');
        }
    });

    // Initial population of dropdowns and filtering when the page loads
    populateDropdowns();
    filterServiceItems();
});
