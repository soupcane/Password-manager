//This code is not finished yet and does NOT work
//import {keyList} from '../keys.js';
(async() => {
    const src = chrome.extension.getURL('keys.js');
    const contentScript = await import(src);
    contentScript.keys();
})();

document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById('loginForm')){
        for(let i = 0; i < keys.length; i++){
            let loginInformation = JSON.parse(this.localStorage.getItem(keyList[i]));

            if(window.location.search == loginInformation.siteLink){
                document.getElementsByTagName('username').value = loginInformation.username;
                document.getElementsByTagName('password').value = loginInformation.password;
            }
        }
    }
})

function getLoginFields() {
    var fieldPais = [];
    pswd = (function(){
        var inputs = document.getElementsByTagName('input'),
                len = inputs.length,
                ret = [];
            while(len--){
                if (inputs[len].type === 'password') {
                    ret[ret.length] = inputs[len];
                }
            }
            return ret;
    })(),
    pswdLength = pswd.length,
        parentForm = function(elem) {
            while (elem.parentNode) {
                if(elem.parentNode.nodeName.toLowerCase() === 'form') {
                    return elem.parentNode;
                }
                elem = elem.parentNode;
            }
        };

        
}