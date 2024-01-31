var key

window.onload = (event) =>{
  try{
    key = this.window.location.search
    key = key.replace("?", "")
    console.log(key)
    
    if(key != null && key != '') //if there is no key then this is a new item
    {
      loginInformation = JSON.parse(this.localStorage.getItem(key))

      this.document.getElementById("username").value = loginInformation.username;
      this.document.getElementById("password").value = loginInformation.password;
      this.document.getElementById("siteLink").value = loginInformation.siteLink;
    }
  }

  finally{
    
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
    console.log(key)
    if(key != null && key != '') //if key is not null (meaning the item already exist) then write over last item with new edited item
    {
      localStorage.setItem(key, loginInformation_serialized);
      console.localStorage;
  }

    else{ //Item doesn't exist
      key = keyGenerator(); //Generates key for new item
      console.log("GENTERATED KEY: " + key)
      localStorage.setItem(key, loginInformation_serialized);
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