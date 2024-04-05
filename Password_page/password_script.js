(function nonGlobal() {
  // avoids global varibles
  let globalKey = 'asdf';

  // The key for the login information is located in the url. The line below gets the key from the URL
  let recieveKey = window.location.search;

  // When the page loads in the code block below is ran.
  window.onload = () => {
    recieveKey = recieveKey.replace('?', '');

    if (recieveKey != null && recieveKey !== '') {
      // if there is no key then this is a new item
      // Uses the key to get the login information stored in local.storage and parses it to get it in the right format
      let loginInformation = JSON.parse(localStorage.getItem(recieveKey));

      // Code below fills out the loginInformation fields
      document.getElementById('username').value = loginInformation.username;
      document.getElementById('password').value = loginInformation.password;
      document.getElementById('siteLink').value = loginInformation.siteLink;
    }
  };
  const passwordInput = document.getElementById('password');
  const showPasswordButton = document.querySelector('.showPassword');

  showPasswordButton.addEventListener('click', () => {
    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
    } else passwordInput.setAttribute('type', 'password');
  });
  const savePasswordButton = document.getElementById('savePasswordButton');
  let keyArr = [];

  savePasswordButton.addEventListener('click', () => {
    // Saves all the information in the fields in this object
    let loginInformation = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      siteLink: document.getElementById('siteLink').value,
    };
    // login information is stringified because local.storage only takes strings
    const loginInformationSerialized = JSON.stringify(loginInformation);

    if (recieveKey != null && recieveKey !== '') {
      localStorage.setItem(recieveKey, loginInformationSerialized);
      alert('Password succesfully modified');
    } else {
      // Item doesn't exist
      keyArr.push(keyGenerator()); // Generates key for new item
      localStorage.setItem(globalKey, JSON.stringify(keyArr));
      let genKey = keyArr[keyArr.length - 1];

      localStorage.setItem(genKey, loginInformationSerialized);
      alert('Password succesfully added');
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
}());
