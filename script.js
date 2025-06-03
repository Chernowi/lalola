function openNav() {
    document.getElementById("mySideMenu").style.width = "250px";
    document.querySelector(".menu-icon").style.display = "none"; // Add this line
    // Optional: Shift main content to the right if you want that effect
    // document.getElementById("mainContent").style.marginLeft = "250px";
    // document.body.style.marginLeft = "250px"; // If body is the main container
}

function closeNav() {
    document.getElementById("mySideMenu").style.width = "0";
    document.querySelector(".menu-icon").style.display = "block"; // Add this line
    // Optional: Shift main content back
    // document.getElementById("mainContent").style.marginLeft = "0";
    // document.body.style.marginLeft = "0";
}

// Close menu if user clicks outside of it (optional)
window.onclick = function(event) {
    const menu = document.getElementById("mySideMenu");
    const menuIcon = document.querySelector(".menu-icon");
    // Check if the click is outside the menu and not on the menu icon itself
    if (event.target !== menu && !menu.contains(event.target) && event.target !== menuIcon && !menuIcon.contains(event.target)) {
        if (menu.style.width === "250px") { // Check if menu is open
            closeNav();
        }
    }
}

// Disable right-click on the entire document
document.addEventListener('contextmenu', event => event.preventDefault());