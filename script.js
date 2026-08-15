const wrapper = document.querySelector(".horizontal-wrapper");
const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".nav-link");

let currentPage = 0;
let isScrolling = false;


/* ==========================================
   GO TO PAGE
========================================== */

function goToPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= panels.length) {
        index = panels.length - 1;
    }

    currentPage = index;

    wrapper.scrollTo({
        left: currentPage * window.innerWidth,
        behavior: "smooth"
    });

    updateNavigation();
}


/* ==========================================
   UPDATE ACTIVE NAV
========================================== */

function updateNavigation() {

    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    if (navLinks[currentPage]) {
        navLinks[currentPage].classList.add("active");
    }
}


/* ==========================================
   MOUSE WHEEL
========================================== */

wrapper.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();

        if (isScrolling) return;


        const currentPanel = panels[currentPage];

        const teamScroll =
            currentPanel.querySelector(".team-scroll");


        /* ======================================
           IF CURRENT PAGE IS TEAM
        ====================================== */

        if (teamScroll) {

            const goingDown = event.deltaY > 0;
            const goingUp = event.deltaY < 0;


            const atTop =
                teamScroll.scrollTop <= 0;


            const atBottom =
                Math.ceil(
                    teamScroll.scrollTop +
                    teamScroll.clientHeight
                )
                >=
                teamScroll.scrollHeight - 2;



            /* DOWN inside Team */

            if (goingDown && !atBottom) {

                teamScroll.scrollBy({
                    top: 450,
                    behavior: "smooth"
                });

                return;
            }



            /* UP inside Team */

            if (goingUp && !atTop) {

                teamScroll.scrollBy({
                    top: -450,
                    behavior: "smooth"
                });

                return;
            }



            /* At bottom -> go next page */

            if (goingDown && atBottom) {

                isScrolling = true;

                goToPage(currentPage + 1);

                setTimeout(() => {
                    isScrolling = false;
                }, 800);

                return;
            }



            /* At top -> go previous page */

            if (goingUp && atTop) {

                isScrolling = true;

                goToPage(currentPage - 1);

                setTimeout(() => {
                    isScrolling = false;
                }, 800);

                return;
            }

        }


        /* ======================================
           NORMAL HORIZONTAL PAGE
        ====================================== */

        isScrolling = true;


        if (event.deltaY > 0) {

            goToPage(currentPage + 1);

        }

        else if (event.deltaY < 0) {

            goToPage(currentPage - 1);

        }


        setTimeout(() => {

            isScrolling = false;

        }, 800);

    },

    {
        passive: false
    }
);
/* ==========================================
   AUTO ACTIVE NAVBAR
   শুধু script.js এর শেষে ADD করো
========================================== */

const horizontalWrapper = document.querySelector(".horizontal-wrapper");
const allPanels = document.querySelectorAll(".panel");
const allNavLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavbar() {

    const scrollLeft = horizontalWrapper.scrollLeft;
    const screenWidth = window.innerWidth;

    const currentSection = Math.round(scrollLeft / screenWidth);

    allNavLinks.forEach(link => {
        link.classList.remove("active");
    });

    if (allNavLinks[currentSection]) {
        allNavLinks[currentSection].classList.add("active");
    }
}


/* পাশের section-এ scroll করলে active change হবে */
horizontalWrapper.addEventListener("scroll", updateActiveNavbar);


/* screen resize হলেও ঠিক থাকবে */
window.addEventListener("resize", updateActiveNavbar);


/* website open হওয়ার সময় */
updateActiveNavbar();