document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const header = document.querySelector("header");
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("nav ul");

    // Toggle theme
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        body.classList.toggle("dark-theme");
        header.classList.toggle("scrolled"); // Adjust class for scrolled state if needed
    });

    // Change navigation style on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Navigation toggle
    navToggle.addEventListener("change", () => {
        if (navToggle.checked) {
            navMenu.classList.add("active");
        } else {
            navMenu.classList.remove("active");
        }
    });
});
document.getElementById('themeToggle').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
});
