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


// Marquee Animation for Skills
    const skillItems = document.querySelectorAll('.skill-item');

    // Calculate total width of all skill items
    let totalWidth = 0;
    skillItems.forEach(item => {
        totalWidth += item.offsetWidth + parseInt(getComputedStyle(item).marginRight);
    });

    // Adjust skills-list width to accommodate all items
    const skillsList = document.querySelector('.skills-list');
    skillsList.style.width = totalWidth + 'px';

    // Reset animation when item is fully out of view
    skillItems.forEach(item => {
        item.addEventListener('animationiteration', () => {
            const itemRect = item.getBoundingClientRect();
            const skillsListRect = skillsList.getBoundingClientRect();

            // Check if item is fully out of view on the left
            if (itemRect.right < skillsListRect.left) {
                // Move item to the end of the queue
                item.style.transform = `translateX(${skillsListRect.width}px)`;
            }
        });
    });

    // Start the animation
    skillItems.forEach(item => {
        item.style.animation = 'slideRight 20s linear infinite';
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
