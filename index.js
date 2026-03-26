const sections = Array.from(document.querySelectorAll("section"));
const navLinks = Array.from(document.querySelectorAll("nav a"));
const pageLoader = document.getElementById("pageLoader");
const topBtn = document.getElementById("topBtn");

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isActive);
    });
};

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("in-view");
            setActiveLink(entry.target.id);
        });
    },
    {
        threshold: 0.35,
        rootMargin: "-10% 0px -25% 0px",
    }
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("DOMContentLoaded", () => {
    if (sections.length > 0) {
        sections[0].classList.add("in-view");
        setActiveLink(sections[0].id);
    }
});

window.addEventListener("load", () => {
    if (pageLoader) {
        pageLoader.classList.add("hidden");
    }

    document.body.classList.remove("loading");
});

const toggleTopButton = () => {
    if (!topBtn) {
        return;
    }

    const shouldShow = window.scrollY > 320;
    topBtn.classList.toggle("visible", shouldShow);
};

window.addEventListener("scroll", toggleTopButton, { passive: true });
toggleTopButton();

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
