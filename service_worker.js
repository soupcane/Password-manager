const cryptKey = retriveFile('textFiles\cryptKey.txt');
console.log(cryptKey)
if(cryptKey == null){
    console.log("1")
 cryptKey =  window.crypto.subtle.generateKey();
 const file = await fileHandle.getFile();
 const writable = await fileHandle.createWritable();
 
 await writable.write("cryptKey");
 await writable.close();

}

async function retriveFile(fileHandle) {
    // Open file picker and destructure the result the first handle
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    return file;
  }
  
  