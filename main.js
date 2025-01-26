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

// Get all the necessary elements
const seasonSelect = document.getElementById('season');
const edibleSelect = document.getElementById('edible');
const cards = document.querySelectorAll('.mushroom-guide .card');
const noResultsMessage = document.querySelector('.no-results-message');

// Function to filter cards
function filterCards() {
    const selectedSeason = seasonSelect.value;
    const selectedEdible = edibleSelect.value;
    let visibleCards = 0;

    cards.forEach(card => {
        const seasonTag = card.querySelector(`[data-season="${selectedSeason}"]`);
        const edibleTag = card.querySelector(`[data-edible="${selectedEdible}"]`);

        // Show all cards if both filters are set to "all"
        if (selectedSeason === 'all' && selectedEdible === 'all') {
            card.style.display = 'flex';
            visibleCards++;
            return;
        }

        // Check if card matches both filters, or matches one filter when the other is "all"
        const matchesSeason = selectedSeason === 'all' || seasonTag;
        const matchesEdible = selectedEdible === 'all' || edibleTag;

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

// Add event listeners to select elements
seasonSelect.addEventListener('change', filterCards);
edibleSelect.addEventListener('change', filterCards);