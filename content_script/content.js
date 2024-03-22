// This code is not finished yet and does NOT work
(function nonGlobal() {
  let temp = JSON.parse(this.localStorage.getItem('asdf'));
  let keys = [];

  if (typeof temp === 'string') {
    // If the data is a string, convert it to a string array
    keys = [temp];
  } else {
    keys = temp;
  }
  console.log(keys);
  keys.forEach((key) => {
    let loginInformation = JSON.parse(localStorage.getItem(key));
    if (window.location.search === loginInformation.siteLink) {
      let emailType = document.querySelector('input[type=email]');
      let dataAttribute = document.querySelectorAll('[data-np-autofill-field-type]');
      let passwordType = document.querySelector('input[type=password');
      if (emaildata.getAttribute('data-np-autofill-field-type') === 'email') {
        emaildata.value = loginInformation.username;
      } else if (emaildata.getAttribute('data-np-autofill-field-type') === 'password') {
        
      }
    }
  });
}());
// https://developer.chrome.com/docs/extensions/reference/api/storage
