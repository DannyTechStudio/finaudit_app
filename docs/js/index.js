/*--------------------------------------------
    DYNAMIC HERO HEADLINE
--------------------------------------------*/ 
const headline = document.getElementById("dynamic-headline");

const headlineTexts = [
    
    "Take control of every money you <span class='orange-c-text'>earn</span> and <span class='orange-c-text'>spend</span>.",
    
    "Track your <span class='orange-c-text'>finances</span> with <span class='orange-c-text'>clarity</span> and <span class='orange-c-text'>simplicity</span> daily.",
    
    "Discover <span class='orange-c-text'>insights</span> that <span class='orange-c-text'>shape</span> your <span class='orange-c-text'>spendings</span> today.",
    
    "Plan <span class='orange-c-text'>budgets</span> that help you achieve your <span class='orange-c-text'>financial goals</span>.",

    "Monitor <span class='orange-c-text'>income</span> and <span class='orange-c-text'>expenses</span> all in one place.",

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
    threshold: 0.1
});

sections.forEach(section => observer.observe(section));


/*-----------------------------------------------
    SCROLL REVEAL FUNCTIONALITY
-----------------------------------------------*/
const revealElements = document.querySelectorAll(".reveal");
const revealObjects = new IntersectionObserver((entries) => {
    
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
revealElements.forEach(el => revealObjects.observe(el));


/*-----------------------------------------------
    COUNTER ANIMATION FUNCTIONALITY FOE WHY METRICS CARD
-----------------------------------------------*/
function animCount(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target * ease;
        el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.done) {
            e.target.dataset.done = '1';
            animCount(e.target);
        }
    });
}, { threshold: 0.6 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));


