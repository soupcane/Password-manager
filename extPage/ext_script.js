(function nonGlobal() { // undviker globala variabler
  const globalKey = 'asdf';
  const template = document.querySelector('#templateId');
  let myTemplateClone = template.content.cloneNode(true); // clone the template
  const myUl = document.getElementById('uList');

  let dropdownState = false;

  let loginInformation = {
    username: '',
    password: '',
    siteLink: '',
  };
  let loginObjectList = [];

  let temp = JSON.parse(localStorage.getItem(globalKey));
  let keys = [];

  if (typeof temp === 'string') {
    // If the data is a string, convert it to a string array
    keys = [temp];
  } else {
    keys = temp;
  }

  console.log(keys);

  if (keys !== null) {
    keys.forEach((element) => {
      loginInformation = JSON.parse(localStorage.getItem(element));
      console.log(element);

      if (loginInformation !== null) {
        let loginObject = {
          WEBSITE: loginInformation.siteLink,
          PASSWORD: loginInformation.password,
          EMAIL: loginInformation.username,
        };

        loginObjectList.push(loginObject);
      } else {
        console.warn(`no password info in key ${element}`);
      }
    });
  }

  const addButton = document.querySelector('.addItem');

  addButton.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('./addPassword.html') });
  });

  window.onload = () => {
    let itemId = 0;

    loginObjectList.forEach((element) => {
      myTemplateClone = template.content.cloneNode(true);

      const nameId = myTemplateClone.getElementById('WebsiteNameId');
      const emailId = myTemplateClone.getElementById('websiteEmailId');
      const listItem = myTemplateClone.getElementById('listItem');

      listItem.dataset.index = itemId.toString();
      itemId += 1;
      nameId.innerHTML = element.WEBSITE;
      emailId.innerHTML = element.EMAIL;

      myUl.appendChild(myTemplateClone);
    });

    const listItems = document.querySelectorAll('#listItem');
    const searchbar = document.getElementById('searchId');

    searchbar.addEventListener('input', () => {
      console.log('searchbar input registered');
      let txtValue = '';
      const filter = searchbar.value.toUpperCase();

      for (let i = 0; i < listItems.length; i += 1) {
        txtValue = loginObjectList[i].WEBSITE;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          listItems[i].style.display = '';
        } else {
          listItems[i].style.display = 'none';
        }
      }
    });

    listItems.forEach((element) => {
      let dropdown; let dropdownList; let itemContainer; let editButton; let deleteButton; let copyPassword; let copyUsername;

      dropdown = element.querySelector('#dropdown');
      dropdownList = element.querySelector('#dropdown-list');
      itemContainer = element.querySelector('#itemContainer');
      editButton = element.querySelector('#editButton');
      deleteButton = element.querySelector('#deleteButton');
      copyPassword = element.querySelector('#copyPassId');
      copyUsername = element.querySelector('#copyEmailId');

      itemContainer.addEventListener('mouseover', mouseover, false);
      itemContainer.addEventListener('mouseleave', mouseleave, false);

      function mouseover() {
        dropdown.style.display = 'inline-flex';
      }

      function mouseleave() {
        if (dropdownState === false) {
          dropdown.style.display = 'none';
        }
      }

      dropdown.addEventListener(
        'mousedown',
        () => {
          dropdownState ? dropdownList.style.display = 'none' : dropdownList.style.display = 'block';
          dropdownState = !dropdownState;
        },
        false,
      );
      console.log('first');
      console.log(keys[element.dataset.index]);

      let elementIndex = element.dataset.index;

      editButton.addEventListener('click', () => {
        console.log('second');
        chrome.tabs.query({ url: `chrome-extension://pijdmddgdbnbhmdkkdaojhplhbjfnibi/addPassword.html?${keys[elementIndex]}` }, (tabs) => {
          if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { active: true });
          } else {
            window.location.href = `../addPassword.html?${keys[elementIndex]}`;
            chrome.tabs.create({ url: chrome.runtime.getURL(`../addPassword.html?${keys[elementIndex]}`) });
          }
        });
      });

      deleteButton.addEventListener('click', () => {
        let currentKeys = JSON.parse(localStorage.getItem('asdf'));

        localStorage.removeItem(currentKeys[elementIndex]);
        currentKeys.splice(elementIndex, 1);
        console.log(currentKeys);
        localStorage.setItem(globalKey, JSON.stringify(currentKeys));

        for (let i = elementIndex; i < currentKeys.length - 1; i += 1) {
          listItems[i].dataset.index -= 1;
        }
      });

      copyPassword.addEventListener('click', () => {
        let passwordToCopy = loginObjectList[elementIndex].PASSWORD;

        navigator.clipboard.writeText(passwordToCopy);
      });
      copyUsername.addEventListener('click', () => {
        let usernameToCopy = loginObjectList[elementIndex].EMAIL;

        navigator.clipboard.writeText(usernameToCopy);
      });
    });
  };
}());
