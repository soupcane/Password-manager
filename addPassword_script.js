(function () { // undviker globala variabler
  const globalKey = 'asdf';
  let keys = localStorage.getItem(globalKey);
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
  };

  const savePasswordButton = document.getElementById('savePasswordButton');

  savePasswordButton.addEventListener('click', () => {
    let loginInformation = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      siteLink: document.getElementById('siteLink').value,
    };

    const loginInformationSerialized = JSON.stringify(loginInformation);
    console.log(recieveKey);
    if (recieveKey != null && recieveKey !== '') {
      localStorage.setItem(recieveKey, loginInformationSerialized);
    } 
    else { // Item doesn't exist
      let tempkey = [];
      tempkey.push(keyGenerator()); // Generates key for new item
      localStorage.setItem(globalKey, tempkey);
      console.log(`GENERATED KEY: ${tempkey}`);
      localStorage.setItem(tempkey, loginInformationSerialized);
      console.log(keys);
    }
  });

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

  const clearLocalStorageButton = document.getElementById('clearLocalStorageButton');

  clearLocalStorageButton.addEventListener('click', () => {
    localStorage.clear();
  });
}());
