// ----------------
// MENU NAVIGATION
// ----------------

const menuButton = document.querySelector('[data-menu]');
const overlayElement = document.querySelector('[data-overlay]');
const navElement = document.querySelector('[data-nav]');
const bodyElement = document.querySelector('[data-body]');

let activeClass = 'open';
let isOpen = false;
let isClosing = false;
let menuTriggerDelay = 500;

// Adding some delay to prevent user from toggling menu instantly.
const setTriggerDelay = () => {
    isClosing = true;

    setTimeout(() => {
        isClosing = false;
    }, menuTriggerDelay);
}

// Toggle menu
const toggleMenu = () => {
    if (isClosing) return;
    isOpen = !isOpen;
    setTriggerDelay()
        
    if (isOpen) {
        bodyElement.classList.add(activeClass);
        menuButton.classList.add(activeClass);
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute("aria-label", "Close menu");
        overlayElement.classList.add(activeClass);
        navElement.classList.add(activeClass);
    }
    
    if (!isOpen) {
        bodyElement.classList.remove(activeClass);
        menuButton.classList.remove(activeClass);
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute("aria-label", "Open menu");
        overlayElement.classList.remove(activeClass);
        navElement.classList.remove(activeClass);
    }
}

// Watch for window resize and toggle off menu based on it.
const handleWindowResize = () => {
    let windowWidth = window.innerWidth;
    let laptopBreakPoint = 769;

    if (windowWidth >= laptopBreakPoint) {
        isOpen = false;
        isClosing = false;
        menuButton.classList.remove('open');
        overlayElement.classList.remove('open');
        navElement.classList.remove('open');
    }
}

// Event listeners
menuButton.addEventListener('click', () => toggleMenu());
window.addEventListener('resize', () => handleWindowResize());

// --------------------------------
// CONTAINER AS PROXY FOR THE LINK
// --------------------------------
const proxyContainers = document.querySelectorAll('[data-proxy]');

proxyContainers.forEach(proxy => {
    const link = proxy.querySelector('[data-link]')
    const threshold = 200;
    let triggerDown, triggerUp, releaseTime;
    proxy.style.cursor = 'pointer';
    
    proxy.onmousedown = () => triggerDown = +new Date();

    // Detect how long user is taking between mousedown and mouseup
    // -- if link is clicked directly - return and perform normal anchor behaviour.
    // -- if releaseTime is less than threshold and event.target isn't link element then fire click() method on link.
    // -- else nothing happens as user is probably selecting/copying text.
    proxy.onmouseup = (event) => {
        if (event.target === link) return;

        triggerUp = +new Date();
        releaseTime = (triggerUp - triggerDown);

        if (releaseTime < threshold) link.click();
    }
})
