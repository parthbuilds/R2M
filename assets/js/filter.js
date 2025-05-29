document.addEventListener('DOMContentLoaded', function() {
            const serviceItems = document.querySelectorAll('.service-item');
            const categoryDropdownMenu = document.getElementById('category-dropdown-menu');
            const brandDropdownMenu = document.getElementById('brand-dropdown-menu');
            const categorySelectedText = document.getElementById('category-selected-text');
            const brandSelectedText = document.getElementById('brand-selected-text');
            const categoryFilterButton = document.getElementById('category-filter-button');
            const brandFilterButton = document.getElementById('brand-filter-button');

            let selectedCategory = 'all';
            let selectedBrand = 'all';

            // Function to populate dropdowns
            function populateDropdowns() {
                const categories = new Set();
                const brands = new Set();

                serviceItems.forEach(item => {
                    if (item.dataset.category) {
                        item.dataset.category.split(',').forEach(cat => categories.add(cat.trim()));
                    }
                    if (item.dataset.brands) {
                        item.dataset.brands.split(',').forEach(brand => brands.add(brand.trim()));
                    }
                });

                const categoryList = categoryDropdownMenu.querySelector('ul');
                const brandList = brandDropdownMenu.querySelector('ul');

                // Clear existing options except 'All'
                categoryList.innerHTML = '<li data-filter="all">All</li>';
                brandList.innerHTML = '<li data-filter="all">All</li>';

                categories.forEach(category => {
                    const li = document.createElement('li');
                    li.dataset.filter = category;
                    li.textContent = category.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()); // Format text
                    categoryList.appendChild(li);
                });

                brands.forEach(brand => {
                    const li = document.createElement('li');
                    li.dataset.filter = brand;
                    li.textContent = brand.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()); // Format text
                    brandList.appendChild(li);
                });
            }

            // Function to filter service items
            function filterServiceItems() {
                serviceItems.forEach(item => {
                    const itemCategories = item.dataset.category ? item.dataset.category.split(',').map(c => c.trim()) : [];
                    const itemBrands = item.dataset.brands ? item.dataset.brands.split(',').map(b => b.trim()) : [];

                    const categoryMatch = selectedCategory === 'all' || itemCategories.includes(selectedCategory);
                    const brandMatch = selectedBrand === 'all' || itemBrands.includes(selectedBrand);

                    if (categoryMatch && brandMatch) {
                        item.style.display = 'block'; // Or original display style
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            // Toggle dropdown visibility
            function toggleDropdown(dropdownElement) {
                // Close other dropdowns if open
                if (dropdownElement === categoryDropdownMenu) {
                    brandDropdownMenu.classList.remove('active');
                } else {
                    categoryDropdownMenu.classList.remove('active');
                }
                dropdownElement.classList.toggle('active');
            }

            // Event listeners for filter buttons
            categoryFilterButton.addEventListener('click', function() {
                toggleDropdown(categoryDropdownMenu);
            });

            brandFilterButton.addEventListener('click', function() {
                toggleDropdown(brandDropdownMenu);
            });

            // Event listeners for selecting options in dropdowns
            categoryDropdownMenu.addEventListener('click', function(event) {
                if (event.target.tagName === 'LI') {
                    selectedCategory = event.target.dataset.filter;
                    categorySelectedText.textContent = `Category: ${event.target.textContent}`;
                    categoryDropdownMenu.classList.remove('active');
                    filterServiceItems();
                    // Update selected class for styling
                    categoryDropdownMenu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                    event.target.classList.add('selected');
                }
            });

            brandDropdownMenu.addEventListener('click', function(event) {
                if (event.target.tagName === 'LI') {
                    selectedBrand = event.target.dataset.filter;
                    brandSelectedText.textContent = `Brand: ${event.target.textContent}`;
                    brandDropdownMenu.classList.remove('active');
                    filterServiceItems();
                    // Update selected class for styling
                    brandDropdownMenu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                    event.target.classList.add('selected');
                }
            });

            // Close dropdowns if clicked outside
            document.addEventListener('click', function(event) {
                if (!categoryDropdownMenu.contains(event.target) && event.target !== categoryFilterButton && event.target !== categorySelectedText) {
                    categoryDropdownMenu.classList.remove('active');
                }
                if (!brandDropdownMenu.contains(event.target) && event.target !== brandFilterButton && event.target !== brandSelectedText) {
                    brandDropdownMenu.classList.remove('active');
                }
            });

            // Initial population and filtering
            populateDropdowns();
            filterServiceItems();
        });