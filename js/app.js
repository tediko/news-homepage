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
        overlayElement.classList.add(activeClass);
        navElement.classList.add(activeClass);
    }
    
    if (!isOpen) {
        bodyElement.classList.remove(activeClass);
        menuButton.classList.remove(activeClass);
        menuButton.setAttribute("aria-expanded", isOpen);
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

proxyContainers.forEach(container => {
    const link = container.querySelector('[data-link]')
    const threshold = 200;
    let triggerDown, triggerUp, releaseTime;
    container.style.cursor = 'pointer';
    // Ignore pointer events and prevent event firing twice as we handle click manually.
    // This also allow user to select/copy link text.
    link.style.pointerEvents = 'none'; 
    
    // Detect releaseTime which is how long user is taking between mousedown and mouseup
    // -- if releaseTime is less than threshold fire click() method on link.
    // -- else nothing happens as user is probably selecting/copying text.
    container.onmousedown = () => triggerDown = +new Date();
    container.onmouseup = () => {
        triggerUp = +new Date();
        releaseTime = (triggerUp - triggerDown);

        if (releaseTime < threshold) link.click();
    }
})
