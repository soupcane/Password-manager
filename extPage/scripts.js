var template = document.querySelector("#templateId");
var my_template_clone = template.content.cloneNode(true); // clone the template 
var my_ul = document.getElementById('uList'); //now you can find the *ul*

import { keys } from "../keys.js";
var dropdownState = false; 

let loginInformation = {
    username : "",
    password : "",
    siteLink : ""
};

var passwordData_list = [];
var elementId = 0;

keys.forEach(element => {
    loginInformation = JSON.parse(localStorage.getItem(element))
    console.log(element);
    var passwordData = {WEBSITE: loginInformation.siteLink, EMAIL: loginInformation.username };
    passwordData_list.push(passwordData);
    elementId++;
});

window.onload = (event) => {
    var itemId = 0;

    passwordData_list.forEach(element => {
        my_template_clone = template.content.cloneNode(true);

        var nameId = my_template_clone.getElementById("WebsiteNameId");
        var emailId = my_template_clone.getElementById("websiteEmailId");
        var listItem = my_template_clone.getElementById("listItem");
        
        listItem.dataset.index = itemId.toString();
        itemId++;
        nameId.innerHTML = element.WEBSITE;
        emailId.innerHTML = element.EMAIL;
        
        my_ul.appendChild(my_template_clone)
    }); 

    let list = document.querySelectorAll("#listItem")
    list.forEach(element => {
        var dropdown = element.querySelector("#dropdown")
        var dropdown_list = element.querySelector("#dropdown-list")
        var itemContainer = element.querySelector("#itemContainer")
        var editButton = element.querySelector("#editButton")

        console.log(element);
        itemContainer.addEventListener(
            "mouseover",
            (event) => {
                dropdown.style.display = "inline-flex"
            },
            false,
        );

        itemContainer.addEventListener(
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
        editButton.addEventListener('click', function(tab) {
            window.location.href = `./addPassword.html?${keys[element.dataset.index]}`
            chrome.tabs.create({url: chrome.runtime.getURL(`./addPassword.html?${keys[element.dataset.index]}`)});
        });
    });
}