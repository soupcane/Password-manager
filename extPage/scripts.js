import * as keys from '../keys';

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
// eslint-disable-next-line no-unused-vars
let elementId;

keys.default.forEach((element) => {
  loginInformation = JSON.parse(localStorage.getItem(element));
  console.log(element);
  const passwordData = { WEBSITE: loginInformation.siteLink, EMAIL: loginInformation.username };
  passwordDataList.push(passwordData);
  elementId += 1;
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
        // eslint-disable-next-line no-unused-expressions
        dropdownState ? dropdownList.style.display = 'none' : dropdownList.style.display = 'block';
        dropdownState = !dropdownState;
      },
      false,
    );
    editButton.addEventListener('click', () => {
      window.location.href = `./addPassword.html?${keys.default[element.dataset.index]}`;
      // eslint-disable-next-line no-undef
      chrome.tabs.create({ url: chrome.runtime.getURL(`./addPassword.html?${keys.default[element.dataset.index]}`) });
    });
  });
};
