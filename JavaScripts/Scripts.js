var burgermenu_list = document.getElementById("burgermenu-listId");
var burgermenu = document.getElementById("burgermenuId");
var burgerMenuState = false;

function displayBurgerMenu() {
    burgermenu.style.display = "inline-flex";
}
function hideBurgerMenu(){
    if (burgerMenuState == false){
        burgermenu.style.display = "none";
    }
}
function openBurgerMenu(){
    burgerMenuState ? 
        burgermenu_list.style.display = "none" : 
        burgermenu_list.style.display = "block";
    burgerMenuState = !burgerMenuState
}