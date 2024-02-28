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
  let keys = [];
  let asd = JSON.parse(localStorage.getItem(globalKey));
  console.log(asd);
  keys.push(JSON.parse(localStorage.getItem(globalKey)));
  if (keys !== null) {
    keys.forEach((element) => {
      loginInformation = JSON.parse(localStorage.getItem(element));
      console.log(element);
      if (loginInformation !== null) {
        const passwordData = {
          WEBSITE: loginInformation.siteLink,
          EMAIL: loginInformation.username,
        };
        passwordDataList.push(passwordData);
        elementId += 1;
      } else {
        console.warn('no password data');
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
      editButton.addEventListener('click', () => {
        console.log('second');
        window.location.href = `../addPassword.html?${keys[element.dataset.index]}`;
        chrome.tabs.create({ url: chrome.runtime.getURL(`../addPassword.html?${keys[element.dataset.index]}`) });
      });
    });
  };
}());
