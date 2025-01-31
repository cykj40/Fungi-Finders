// Add this at the beginning of main.js
// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved theme preference, default to dark if none saved
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeToggleIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
});

function updateThemeToggleIcon(theme) {
    const lightIcon = themeToggle.querySelector('.light-icon');
    const darkIcon = themeToggle.querySelector('.dark-icon');

    if (theme === 'light') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }
}

const hamburgerButton = document.querySelector(
    '[aria-controls="primary-navigation"]'
);
const nav = document.querySelector(".primary-navigation");

hamburgerButton.addEventListener("click", () => {
    // check if the navigation is opened
    const isNavOpened = hamburgerButton.getAttribute("aria-expanded");

    if (isNavOpened === "false") {
        hamburgerButton.setAttribute("aria-expanded", "true");
    } else {
        hamburgerButton.setAttribute("aria-expanded", "false");
    }
});

// Only run the filtering code if we're on the mushroom guide page
if (document.querySelector('.mushroom-guide')) {
    const seasonSelect = document.getElementById('season');
    const edibleSelect = document.getElementById('edible');
    const cards = document.querySelectorAll('.mushroom-guide .card');
    const noResultsMessage = document.querySelector('.no-results-message');

    function filterCards() {
        const selectedSeason = seasonSelect.value;
        const selectedEdible = edibleSelect.value;
        let visibleCards = 0;

        cards.forEach(card => {
            // Find tags within this card
            const seasonTags = card.querySelectorAll('.tag-list li[data-season]');
            const edibleTags = card.querySelectorAll('.tag-list li[data-edible]');

            // Check if any tags match the selected values
            const matchesSeason = selectedSeason === 'all' ||
                Array.from(seasonTags).some(tag => tag.dataset.season === selectedSeason);

            const matchesEdible = selectedEdible === 'all' ||
                Array.from(edibleTags).some(tag => tag.dataset.edible === selectedEdible);

            // Show/hide card based on matches
            if (matchesSeason && matchesEdible) {
                card.style.display = 'flex';
                visibleCards++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        noResultsMessage.hidden = visibleCards > 0;
    }

    // Add event listeners
    seasonSelect.addEventListener('change', filterCards);
    edibleSelect.addEventListener('change', filterCards);
}