const savePasswordButton = document.getElementById("savePasswordButton");
export var ImpKey = [1];

savePasswordButton.addEventListener("click", function() {
    let loginInformation = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value
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