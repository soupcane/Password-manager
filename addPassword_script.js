import {keyList} from './keys.js';

console.log(keyList.keys);
let recieveKey;
window.onload = () => {
  recieveKey = window.location.search;
  recieveKey = recieveKey.replace('?', '');

  if (recieveKey != null && recieveKey !== '') // if there is no key then this is a new item
  {
    loginInformation = JSON.parse(this.localStorage.getItem(recieveKey));

    this.document.getElementById('username').value = loginInformation.username;
    this.document.getElementById('password').value = loginInformation.password;
    this.document.getElementById('siteLink').value = loginInformation.siteLink;
  }
}

const savePasswordButton = document.getElementById('savePasswordButton');

savePasswordButton.addEventListener('click', () => {
  let loginInformation = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    siteLink: document.getElementById('siteLink').value,
  };

  const loginInformationSerialized = JSON.stringify(loginInformation);
  console.log(recieveKey);
  if (recieveKey != null && recieveKey !== '') // if key is not null (meaning the item already exist) then write over last item with new edited item
  {
    localStorage.setItem(recieveKey, loginInformationSerialized);
  }
  else { // Item doesn't exist
    let tempkey = keyGenerator(); // Generates key for new item
    keyList.keys.push(tempkey); 
    console.log(`GENERATED KEY: ${tempkey}`);
    localStorage.setItem(tempkey, loginInformationSerialized);
    console.log(keyList.keys);
  }
});

function showPassword() {
  let x = document.getElementById('password');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}

function keyGenerator() {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let keyLength = 12;
  let generatedKey = '';

  for (let i = 0; i <= keyLength; i += 1) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    generatedKey += chars.substring(randomNumber, randomNumber + 1);
  }

  return generatedKey;
}

const clearLocalStorageButton = document.getElementById('clearLocalStorageButton')

clearLocalStorageButton.addEventListener('click', () => {
  localStorage.clear();
});
