const dropdown_list = document.getElementById("dropdown-listId");
const dropdown = document.getElementById("dropdownId");
const container = document.getElementById("passItem")

const savePasswordButton = document.getElementById("savePasswordButton");

import { ImpKey } from "../addPassword_script.js";
var dropdownState = false; 

window.onload = (event) => {
    console.log("HEJ")
    let Data = [];
    Data.push  
    // let Data = JSON.parse(localStorage.getItem(ImpKey))
    console.log(Data);
    for (let i = 0; i < 3; i++){
    let ItemWebsiteName = Data[0]
    }
    console.log("HEJ")
    console.log(savePasswordButton)
};

container.addEventListener(
    "mouseover",
    (event) => {
        dropdown.style.display = "inline-flex"
    },
    false,
);
container.addEventListener(
    "mouseleave",
    (event) => {
        if (dropdownState == false){
            dropdown.style.display = "none";
        }
    },
    false,
);
dropdown.addEventListener(
    "mousedown",
    (event) => {
        dropdownState ? 
            dropdown_list.style.display = "none" : 
            dropdown_list.style.display = "block";
        dropdownState = !dropdownState
    },
    false,
);