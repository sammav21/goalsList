//Like in C, start by defining the global variables
const inputText = document.querySelector('.input');
const inputButton = document.querySelector('.add');
const inputList = document.querySelector('.list');

//This is where I start to advise JS what item will have interactivity
inputButton.addEventListener('click', createList);

function createList(event){
    event.preventDefault();

    const listDiv = document.createElement('div');
    listDiv.classList.add('listDiv');
    inputList.appendChild(listDiv);

    const inputItem = document.createElement('li');
    inputItem.innerHTML = inputText.value;
    inputItem.classList.add('list-item');
    listDiv.appendChild(inputItem);
    inputText.value = '';

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-thin fa-check"></i>';
    checkButton.classList.add('list-button');
    listDiv.appendChild(checkButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-light fa-dash"></i>';
    removeButton.classList.add('list-button');
    listDiv.appendChild(removeButton);


}
//Create buttons for check, delete, and details
//Also figure out how to make items movable (drag/drop) depending on importance
