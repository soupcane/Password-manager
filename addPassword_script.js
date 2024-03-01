let keyArr = [];
(function () { // undviker globala variabler
  const globalKey = 'asdf';
  let recieveKey;
  window.onload = () => {
    recieveKey = window.location.search;
    recieveKey = recieveKey.replace('?', '');

    if (recieveKey != null && recieveKey !== '') // if there is no key then this is a new item
    {
      let loginInformation = JSON.parse(localStorage.getItem(recieveKey));

      document.getElementById('username').value = loginInformation.username;
      document.getElementById('password').value = loginInformation.password;
      document.getElementById('siteLink').value = loginInformation.siteLink;
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
    if (recieveKey != null && recieveKey !== '') {
      localStorage.setItem(recieveKey, loginInformationSerialized);
    } 
    else { // Item doesn't exist
      keyArr.push(keyGenerator()); // Generates key for new item
      console.log(keyArr);
      localStorage.setItem(globalKey, JSON.stringify(keyArr));
      let genKey = keyArr[keyArr.length - 1];
      console.log(`GENERATED KEY: ${genKey}`);
      localStorage.setItem(genKey, loginInformationSerialized);
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
