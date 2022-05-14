//Like in C, start by defining the global variables
const inputText = document.querySelector('.input');
const inputButton = document.querySelector('.add');
const inputList = document.querySelector('.list');

//This is where I start to advise JS what item will have interactivity
inputButton.addEventListener('click', createList);
inputList.addEventListener('click', deleteRow);
inputList.addEventListener('click', completeRow);
inputList.addEventListener('click', openDetails);

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
    detailsButton.classList.add('closed');
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




function openDetails(e){
    const detailsButton = e.target;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details-div');

    const why = document.createElement('div');
    why.classList.add('why-div');
    const whyPrompt = document.createElement('p');
    whyPrompt.classList.add('whyPrompt');
    whyPrompt.innerText = 'This goal is important to me because...';
    why.appendChild(whyPrompt);
    const whyInput = document.createElement('input');
    whyInput.type = 'text';
    whyInput.classList.add('whyInput');
    why.appendChild(whyInput);

    const steppingStones = document.createElement('div');
    steppingStones.classList.add('stones-div');
    const deadline = document.createElement('div');
    deadline.classList.add('deadline-div');
    detailsDiv.appendChild(why);
    detailsDiv.appendChild(steppingStones);
    detailsDiv.appendChild(deadline);
    const listItem = detailsButton.closest('div');

if (detailsButton.classList[1] ==='closed'){
    detailsButton.classList.remove('closed'); 
    detailsButton.classList.add('open');
    listItem.after(detailsDiv);
} 
else if(detailsButton.classList[1] === 'open'){
    detailsButton.classList.remove('open'); 
    detailsButton.classList.add('closed');
    let nextDiv = listItem.nextElementSibling;
    nextDiv.style.display = 'none';
}
}



//this open/close issue with details might need a 3rd form so that the open adn close aren't being clicked at the same time. So maybe a third class option to serve as neutral ground






//Create buttons for check, delete, and details
//Also figure out how to make items movable (drag/drop) depending on importance
