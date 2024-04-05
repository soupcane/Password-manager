// immediately executing function to avoid exposing variables to global scope
// variables outside this function are global
(function nonGlobal() {
  // global key to access an array of keys, each corresponding to a created login item.
  const globalKey = 'asdf';

  // accesses the template node and its children
  const template = document.querySelector('#templateId');

  let templateClone = '';
  const myUl = document.getElementById('uList');
  let dropdownOpened = false;
  let loginInformation = {
    username: '',
    password: '',
    siteLink: '',
  };
  const loginObjectList = [];

  // temporary variable with all login item keys
  const temp = JSON.parse(localStorage.getItem(globalKey));
  let keys = [];

  // If the data is a string, convert it to a string array
  // this is for when you store a single key which gets stringified in the JSON as a string instead of an array
  if (typeof temp === 'string') {
    keys = [temp];
  } else {
    keys = temp;
  }

  if (keys !== null) {
    keys.forEach((key) => {
      // retrieves the login data stored in localstorage with its specific key
      loginInformation = JSON.parse(localStorage.getItem(key));

      if (loginInformation !== null) {
        // adds the login data to a temporary variable
        let loginObject = {
          WEBSITE: loginInformation.siteLink,
          PASSWORD: loginInformation.password,
          EMAIL: loginInformation.username,
        };

        loginObjectList.push(loginObject);
      }
    });
  }

  const addButton = document.querySelector('.addItem');
  // when the add password button is clicked, create a new tab in chrome with the password site opened
  addButton.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('./Password_page/password.html') });
  });

  window.onload = () => {
    let itemId = 0;

    loginObjectList.forEach((element) => {
      // clone the template for each login item as values are modified
      templateClone = template.content.cloneNode(true);

      // accesses elements from the cloned template
      const nameId = templateClone.getElementById('WebsiteNameId');
      const emailId = templateClone.getElementById('websiteEmailId');
      const listItem = templateClone.getElementById('listItem');

      // sets the Id for each element starting from 0 using the dataset property
      listItem.dataset.index = itemId.toString();
      itemId += 1;
      nameId.innerHTML = element.WEBSITE;
      emailId.innerHTML = element.EMAIL;

      // appends the modified login item to the bottom of the list
      myUl.appendChild(templateClone);
    });

    const listItems = document.querySelectorAll('#listItem');
    const searchbar = document.getElementById('searchId');

    searchbar.addEventListener('input', () => {
      let txtValue = '';
      // toUpperCase() makes the inputted search non case sensitive
      const filter = searchbar.value.toUpperCase();

      // goes through each website name and tests if it contains any letters from the search
      for (let i = 0; i < listItems.length; i += 1) {
        txtValue = loginObjectList[i].WEBSITE;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          listItems[i].style.display = '';
        } else {
          listItems[i].style.display = 'none';
        }
      }
    });
    // initializes the variables for storing accessed elements
    listItems.forEach((element) => {
      let dropdown;
      let dropdownList;
      let itemContainer;
      let editButton;
      let deleteButton;
      let copyPassword;
      let copyUsername;

      // accesses various nodes in a list item
      dropdown = element.querySelector('#dropdown');
      dropdownList = element.querySelector('#dropdown-list');
      itemContainer = element.querySelector('#itemContainer');
      editButton = element.querySelector('#editButton');
      deleteButton = element.querySelector('#deleteButton');
      copyPassword = element.querySelector('#copyPassId');
      copyUsername = element.querySelector('#copyEmailId');

      // display the dropdown button for a login item if mouse is hovering over it
      itemContainer.addEventListener('mouseover', mouseover, false);

      // if mouse stops hovering over the element, dont display the dropdown button
      itemContainer.addEventListener('mouseleave', mouseleave, false);

      function mouseover() {
        dropdown.style.display = 'inline-flex';
      }

      function mouseleave() {
        if (dropdownOpened === false) {
          dropdown.style.display = 'none';
        }
      }

      // when the dropdown button is clicked, the dropdown menu either opens or closes depending on its state
      dropdown.addEventListener(
        'mousedown',
        () => {
          // the dropdown menu is either displayed or not depending on its state via a ternary operation
          dropdownOpened
            ? (dropdownList.style.display = 'none')
            : (dropdownList.style.display = 'block');

          // inverts the state for whether its opened or not
          dropdownOpened = !dropdownOpened;
        },
        false,
      );

      let elementIndex = element.dataset.index;

      editButton.addEventListener('click', () => {
        // check if the tab already exists
        chrome.tabs.query(
          {
            url: chrome.runtime.getURL(
              `chrome-extension://pijdmddgdbnbhmdkkdaojhplhbjfnibi/Password_page/password.html?${keys[elementIndex]}`,
            ),
          },
          (tabs) => {
            // dont create a new tab if one already exists, instead focus to it
            if (tabs.length > 0) {
              chrome.tabs.update(tabs[0].id, { active: true });

              // if the tab doesnt exist, create a new one with the key for the login item to modify included in the URL
              // the key is included so that the login data can be accessed on the page too.
            } else {
              window.location.href = `./Password_page/password.html?${keys[elementIndex]}`;
              chrome.tabs.create({
                url: chrome.runtime.getURL(`./Password_page/password.html?${keys[elementIndex]}`),
              });
            }
          },
        );
      });

      // deletes a login item from the localstorage
      deleteButton.addEventListener('click', () => {
        let currentKeys = JSON.parse(localStorage.getItem(globalKey));

        // deletes the JSON item of the specified element
        localStorage.removeItem(currentKeys[elementIndex]);

        // removes the corresponding key from the list
        currentKeys.splice(elementIndex, 1);

        // replaces the list of keys with the modified one
        localStorage.setItem(globalKey, JSON.stringify(currentKeys));

        // loops through all the list items after the removed one, decreasing the index property by one on each
        for (let i = elementIndex; i < currentKeys.length - 1; i += 1) {
          listItems[i].dataset.index -= 1;
        }
      });

      // copies the data from the login item to system clipboard
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
