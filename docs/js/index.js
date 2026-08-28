/*--------------------------------------------
    DYNAMIC HERO HEADLINE
--------------------------------------------*/ 
const headline = document.getElementById("dynamic-headline");

const headlineTexts = [
    
    "Take absolute control of every Cedi you <span class='orange-c-text'>earn</span> and <span class='orange-c-text'>spend</span>.",
    
    "Track your <span class='orange-c-text'>finances</span> with <span class='orange-c-text'>clarity</span> and <span class='orange-c-text'>simplicity</span> daily.",
    
    "Discover <span class='orange-c-text'>insights</span> that <span class='orange-c-text'>shape</span> your <span class='orange-c-text'>spending</span> choices today.",
    
    "Plan <span class='orange-c-text'>budgets</span> that help you achieve your <span class='orange-c-text'>financial goals</span>.",

    "Monitor <span class='orange-c-text'>income</span>, <span class='orange-c-text'>expenses</span>, and <span class='orange-c-text'>savings</span> all in one place.",

    "Make <span class='orange-c-text'>smarter</span> money choices with clear <span class='orange-c-text'>financial insights</span>.",

    "Everything you need for <span class='orange-c-text'>better</span> everyday money <span class='orange-c-text'>management</span>."
];

let currentIndex = 0;

headline.innerHTML = headlineTexts[currentIndex];
headline.classList.add("animate-text");

headline.addEventListener("animationiteration", () => {
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % headlineTexts.length;
        headline.innerHTML = headlineTexts[currentIndex];
    }, 5000);
});


/*-----------------------------------------------
            ACTIVE TAB FUNCTIONALITY
-----------------------------------------------*/
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links-wrapper a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));
            
            const id = entry.target.getAttribute("id");
            const activeLink = document.querySelector(`.nav-links-wrapper a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
}, {
    threshold: 0.4
});

sections.forEach(section => observer.observe(section));

