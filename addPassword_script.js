import { keys } from "./keys.js";
let tempkey;
window.onload = (event) =>{
    tempkey = this.window.location.search
    tempkey = tempkey.replace("?", "")
    console.log(tempkey)
    
    if(tempkey != null && tempkey != '') //if there is no key then this is a new item
    {
      loginInformation = JSON.parse(this.localStorage.getItem(tempkey))

      this.document.getElementById("username").value = loginInformation.username;
      this.document.getElementById("password").value = loginInformation.password;
      this.document.getElementById("siteLink").value = loginInformation.siteLink;
    }
}

const savePasswordButton = document.getElementById("savePasswordButton");

savePasswordButton.addEventListener("click", function() {
    let loginInformation = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
        siteLink : document.getElementById("siteLink").value
    };

    let loginInformation_serialized = JSON.stringify(loginInformation);
    console.log(tempkey)
    if(tempkey != null && tempkey != '') //if key is not null (meaning the item already exist) then write over last item with new edited item
    {
      localStorage.setItem(tempkey, loginInformation_serialized);
      console.localStorage;
  }

    else{ //Item doesn't exist
      keys.push(keyGenerator()); //Generates key for new item
      console.log("GENTERATED KEY: " + keys[keys.length])
      localStorage.setItem(keys[keys.length], loginInformation_serialized);
    }
})

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
   }
}

function keyGenerator() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var keyLength = 12;
  var generatedKey = "";

  for (var i = 0; i <= keyLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    generatedKey += chars.substring(randomNumber, randomNumber +1);
   }

   return generatedKey;
}

const clearLocalStorageButton = document.getElementById("clearLocalStorageButton")

clearLocalStorageButton.addEventListener("click", function() {
  localStorage.clear();
})

function encryptLoginInformation(loginInformation){
  
}