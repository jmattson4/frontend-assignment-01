function addToDom(selector, item){
    const location = document.querySelector(selector)
    location.appendChild(item);
}
function createEventOnElement(selector, event){
    const node = document.querySelector(selector);
    node.addEventListener(event);
}

function checkChildren(selector){
    const location = document.querySelector(selector);
    return location.children > 0;
}
function removeChildren(selector){
    const node = document.querySelector(selector);
    node.innerHTML = '';
}
function addMultipleToDom(selector, items){
    const location = document.querySelector(selector)
     
    items.forEach(item=>{
         location.appendChild(item)
    })
}

export{
    addToDom,
    addMultipleToDom,
    removeChildren,
    checkChildren,
    createEventOnElement
} 