const burgermenu_list = document.getElementById("burgermenu-listId");
const burgermenu = document.getElementById("burgermenuId");
const container = document.getElementById("passItem")
import { ImpKey } from "../addPassword_script.js";
var burgerMenuState = false; 

window.onload = (event) => {
    let Data = JSON.parse(localStorage.getItem(ImpKey))
    console.log(Data);
    //for (let i = 0; i < 3; i++){
    //let ItemWebsiteName = Data.
    //}
};

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