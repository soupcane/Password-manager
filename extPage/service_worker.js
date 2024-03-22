

var reallyLongString = GenerateCryptKey();
console.log(reallyLongString);
const url = `data:text/plain,${reallyLongString}`; 
const filename = "cryptKey.txt";
//chrome.downloads.download({url, filename});

async function GenerateCryptKey()
{
  return await crypto.subtle.generateKey();
}