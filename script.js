/* =========================================================
   AI LEARNING HUB
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const themeToggle =
    document.getElementById("themeToggle");

const currentYear =
    document.getElementById("currentYear");

const navLinks =
    document.querySelectorAll(".nav-link");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

    if (!mainNav || !menuToggle) {
        return;
    }

    mainNav.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    body.classList.remove("menu-open");

}


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );

}


/* Close mobile menu when navigation link is clicked */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            closeMenu();

        }
    );

});


/* Close menu when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (!mainNav || !menuToggle) {
            return;
        }

        if (
            mainNav.classList.contains("open") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme =
    localStorage.getItem("ai-learning-theme");


function applyTheme(theme) {

    if (theme === "dark") {

        body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

    } else {

        body.classList.remove("dark");

        if (themeToggle) {
            themeToggle.textContent = "◐";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }

    }

}


if (savedTheme) {

    applyTheme(savedTheme);

} else {

    const prefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    applyTheme(
        prefersDark ? "dark" : "light"
    );

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                body.classList.toggle("dark");

            const newTheme =
                isDark ? "dark" : "light";

            localStorage.setItem(
                "ai-learning-theme",
                newTheme
            );

            applyTheme(newTheme);

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.getAttribute("id");

                navLinks.forEach(link => {

                    const href =
                        link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        href === `#${id}`
                    );

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".course-card, .feature-box, .tool-card, .article-card, .resource-item, .faq-item"
    );


revealElements.forEach(
    element => {

        element.classList.add("reveal");

    }
);


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(element);

    }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    event.preventDefault();
                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800 &&
            mainNav
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   DISABLE BROKEN "#" TOOL LINKS
   UNTIL REAL TOOL PAGES ARE CREATED
========================================================= */

document
    .querySelectorAll(
        '.tool-card[href="#"]'
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    "This tool will be available soon."
                );

            }
        );

    });