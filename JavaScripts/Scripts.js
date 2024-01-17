const burgermenu_list = document.getElementById("burgermenu-listId");
const burgermenu = document.getElementById("burgermenuId");
const container = document.getElementById("passItem")
var burgerMenuState = false; 

container.addEventListener(
    "mouseover",
    (event) => {
        burgermenu.style.display = "inline-flex"
    },
    false,
);
container.addEventListener(
    "mouseleave",
    (event) => {
        if (burgerMenuState == false){
            burgermenu.style.display = "none";
        }
    },
    false,
);
burgermenu.addEventListener(
    "mousedown",
    (event) => {
        burgerMenuState ? 
            burgermenu_list.style.display = "none" : 
            burgermenu_list.style.display = "block";
        burgerMenuState = !burgerMenuState
    },
    false,
);