// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


// edit option
let editElement;
let editFlag = false;
let editID = "";


// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);
//borrar articulo
clearBtn.addEventListener("click",clearItems);

window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
//Agregar articulo
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        
        createListItem(id, value);

        displayAlert("Articulo agregado a la lista", "success");
        container.classList.add("show-container");
        addToLocalStorage(id, value);
        setBackToDefault();
    }else if(value && editFlag){
        //Editar un Item
        editElement.innerHTML = value;
        displayAlert("valor cambiado", "success");
        editLocalStorage(editID, value);
        setBackToDefault();
    }else{  
        //Advertencia
        displayAlert("por favor ingrese un valor", "danger");
    }
}

//display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //Remueve la advertencia
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

//borrar articulos
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("lista vacia", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}

//Borrar un articulo
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("Articulo eliminado", "danger");
    setBackToDefault();
    //Eliminar el articulo del localstorage
    removeFromLocalStorage(id);
}

//Editar un articulo
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;

    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = element.textContent;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

//set back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editiD = "";
    submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = { id, value };
    let items = getLocalStorage();
    
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value){
    let items = getLocalStorage();

    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value);
        });
        container.classList.add("show-container");
    }
}

function createListItem(id, value){
    //Agregar un item
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
        <button type="button" class='edit-btn'>
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class='delete-btn'>
            <i class="fas fa-trash"></i>
        </button>
        </div>
    `;

    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener("click",deleteItem);
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);
}