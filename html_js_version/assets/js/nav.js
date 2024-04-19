export function navToggle() {
    const menuButton = document.getElementById('toggleNavBtn');
    const nav = document.getElementById('nav');

    menuButton.addEventListener('click', function () {
        if (window.getComputedStyle(nav).display === "block") {
            nav.style.display = "none";
        } else if (window.getComputedStyle(nav).display === "none") {
            nav.style.display = "block";
        }
    })
}