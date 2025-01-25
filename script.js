console.log('Script loaded');

const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');

console.log('navToggle:', navToggle);
console.log('primaryNav:', primaryNav);

navToggle.addEventListener('click', () => {
    console.log('Button clicked!');
    const visibility = primaryNav.getAttribute('data-visible');

    if (visibility === "false") {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
}); 