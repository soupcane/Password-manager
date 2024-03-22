(function nonGlobal() {
  let documentElements = document.children;
  documentElements.forEach((element) => {
    let div = document.createElement('DIV');
    div.classList.add('.div');
    
  });
}());
