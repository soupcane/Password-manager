(function () { // undviker globala variabler
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
  const passwordDataList = [];

  let elementId;
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
        let passwordData = {
          WEBSITE: loginInformation.siteLink,
          PASSWORD: loginInformation.password,
          EMAIL: loginInformation.username,
        };
        passwordDataList.push(passwordData);
        elementId += 1;
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

    passwordDataList.forEach((element) => {
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

    const list = document.querySelectorAll('#listItem');
    list.forEach((element) => {
      const dropdown = element.querySelector('#dropdown');
      const dropdownList = element.querySelector('#dropdown-list');
      const itemContainer = element.querySelector('#itemContainer');
      const editButton = element.querySelector('#editButton');
      const deleteButton = element.querySelector('#deleteButton');
      const copyPassword = element.querySelector('#copyPassId');
      const copyUsername = element.querySelector('#copyEmailId');

      console.log(element);
      itemContainer.addEventListener(
        'mouseover',
        () => {
          dropdown.style.display = 'inline-flex';
        },
        false,
      );

      itemContainer.addEventListener(
        'mouseleave',
        () => {
          if (dropdownState === false) {
            dropdown.style.display = 'none';
          }
        },
        false,
      );

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
        for (let i = element.dataset.index; i < currentKeys.length - 1; i += 1) {
          list[i].dataset.index -= 1;
        }
      });

      copyPassword.addEventListener('click', () => {
        let passwordToCopy = passwordDataList[element.dataset.index].PASSWORD;
        navigator.clipboard.writeText(passwordToCopy);
      });
      copyUsername.addEventListener('click', () => {
        let usernameToCopy = passwordDataList[element.dataset.index].EMAIL;
        navigator.clipboard.writeText(usernameToCopy);
      });
    });
  };
}());
