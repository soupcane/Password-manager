try
{
  fetch('textFiles/cryptKeys.txt')
    .then((response) => response.text())
    .then((text) => console.log(text));
}
finally
{
  const reallyLongString = GenerateCryptKey();
  console.log(reallyLongString);
  const url = `data:text/plain,${reallyLongString}`; 
  const filename = "cryptKey.txt";
  chrome.downloads.download({url, filename});

  async function GenerateCryptKey()
  {
    const getPasswordKey = (password) =>
    window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return getPasswordKey;
  }
}