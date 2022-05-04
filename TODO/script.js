//Like in C, start by defining the global variables
const inputText = document.querySelector('.input');
const inputButton = document.querySelector('.add');
const inputList = document.querySelector('.list');

//This is where I start to advise JS what item will have interactivity
inputButton.addEventListener('click', createList);
inputList.addEventListener('click', deleteRow);
inputList.addEventListener('click', completeRow);
inputList.addEventListener('click', details);

function createList(event){
    event.preventDefault();

    if (inputText.value == ''){
        return false;
    }

    const listDiv = document.createElement('div');
    listDiv.classList.add('listDiv');
    inputList.appendChild(listDiv);

    const inputItem = document.createElement('li');
    inputItem.innerHTML = inputText.value;
    inputItem.classList.add('list-text');
    listDiv.appendChild(inputItem);
    inputText.value = '';

    const detailsButton = document.createElement('button');
    detailsButton.innerHTML = '<i class="fa-solid fa-caret-down" id="details"></i>';
    detailsButton.classList.add('list-button')
    detailsButton.classList.add('details');
    listDiv.appendChild(detailsButton);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-solid fa-check"id="check"></i>';
    checkButton.classList.add('list-button');
    checkButton.classList.add('check');
    listDiv.appendChild(checkButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-minus" id="remove"></i>';
    removeButton.classList.add('list-button');
    removeButton.classList.add('remove');
    listDiv.appendChild(removeButton);
}



function deleteRow(e){
    const removeButton = e.target;

    if (removeButton.classList[1] === 'remove'){
        const listItem = removeButton.closest('div');
        listItem.remove();
    }
}

function completeRow(e){
    const completeButton = e.target;

    if (completeButton.classList[1] === 'check'){
        const listItem = completeButton.closest('div');
        const checkButton = completeButton.querySelector('#check');
        listItem.classList.toggle('completedItem');
        checkButton.classList.toggle('completedButton');  

    }

}

//Create buttons for check, delete, and details
//Also figure out how to make items movable (drag/drop) depending on importance
