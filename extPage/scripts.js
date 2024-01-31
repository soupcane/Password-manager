const dropdown_list = document.getElementById("dropdown-listId");
const dropdown = document.getElementById("dropdownId");
const itemContainer = document.getElementById("passItem")
const itemList = document.getElementById('itemList')
const savePasswordButton = document.getElementById("savePasswordButton");
var siteTemplate = document.getElementById('template')

import { keys } from "../keys.js";
var dropdownState = false; 
var contentloaded = false;

let loginInformation = {
    username : "",
    password : "",
    siteLink : ""
};

loginInformation = JSON.parse(localStorage.getItem("1"))
var passwordData = {WEBSITE: loginInformation.siteLink, EMAIL: loginInformation.username};

const html =
`<li>
    <div class="itemContainer" id="passItem">
        <div>
        <div class="website-Name">
            <h3 id="WebsiteNameId" style="padding-left: 5px;">{WEBSITE}</h3>
        </div>
            <div class="website-Email">{EMAIL}</div>
        </div>
        <div class="dropdown-container">
        <button class="dropdown" id="dropdownId">
            <span class="LeftDot"></span>
            <span class="MiddleDot"></span>
            <span class="RightDot"></span>
        </button>
        <ul class="dropdown-list" id="dropdown-listId" >
            <li href="addPassword.html" class="edit">Edit</li>
            <li class="copyPass">Copy Password</li>
            <li class="copyEmail">Copy Email</li>
        </ul>
        </div>
    </div>
</li>`;

function replaceMe(template, data) {
    const pattern = /{\s*(\w+?)\s*}/g; // {property}
    return template.replace(pattern, (_, token) => data[token] || '');
}


window.onload = (event) => {
    console.log(keys)
    console.log(loginInformation);
    siteTemplate = replaceMe(html, passwordData),
    itemList.insertAdjacentHTML('beforeend', siteTemplate)
    contentloaded = true;
    
    function waitForElm(element) {
        return new Promise(resolve => {
            if (document.querySelector(element)) {
                return resolve(document.querySelector(element));
            }
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(element)) {
                    observer.disconnect();
                    resolve(document.querySelector(element));
                }
            });
        });
    }
    waitForElm("#itemContainer").then((elm) => {
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
    });
    
    waitForElm("#dropdownId").then((elm) => {
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
    });
};