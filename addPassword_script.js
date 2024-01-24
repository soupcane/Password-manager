addEventListener(onload, function(){
  try{
    var key = this.window.location.search
    if(key != null)
    {console.log(queryString);

    loginInformation = JSON.parse(this.localStorage.getItem(key))}

    this.document.getElementById("username").value = loginInformation.username
    this.document.getElementById("password").value = loginInformation.password
    this.document.getElementById("siteLink").value = loginInformation.siteLink
  }

  finally{
    
  }
})

const savePasswordButton = document.getElementById("savePasswordButton");
export var ImpKey = [1];

savePasswordButton.addEventListener("click", function() {
    let loginInformation = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
        siteLink : document.getElementById("siteLink").value
    };

    let loginInformation_serialized = JSON.stringify(loginInformation);
    localStorage.setItem(key, loginInformation_serialized);
    console.localStorage;
})

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}