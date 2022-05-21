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
    detailsButton.classList.add('listButton')
    detailsButton.classList.add('closed');
    listDiv.appendChild(detailsButton);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-solid fa-check"id="check"></i>';
    checkButton.classList.add('listButton');
    checkButton.classList.add('check');
    listDiv.appendChild(checkButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-minus" id="remove"></i>';
    removeButton.classList.add('listButton');
    removeButton.classList.add('remove');
    listDiv.appendChild(removeButton);

    /*Below I create the drop down div for the details section. Including it here ensures it only happens once per new input */
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('detailsDiv');
    detailsDiv.style.display = 'none';
    inputList.appendChild(detailsDiv);

    const why = document.createElement('div');
    why.classList.add('why-div');
    const whyPrompt = document.createElement('p');
    whyPrompt.innerText = 'This goal is important to me because...';
    why.appendChild(whyPrompt);
    const whyInput = document.createElement('div');
    whyInput.classList.add('whyInput');
    why.appendChild(whyInput);
    const whyText = document.createElement('textarea');
    whyText.maxLength = '150';
    whyText.classList.add('whyText');
    whyInput.appendChild(whyText);
    const whyAdd = document.createElement('i');
    whyAdd.innerHTML = '<i class="fa-thin fa-plus" id="whyAdd">';
    whyInput.appendChild(whyAdd);

    whyAdd.addEventListener('click', setReason);

    function setReason(event){
        event.preventDefault(); 
        
        if (whyText.value == ''){
            return false;
        }

        else if (whyAdd.classList[1] != 'active'){
        whyInput.classList.toggle('setReasonDiv');
        whyText.classList.toggle('setReason');
        whyAdd.classList.toggle('active');
        whyText.toggleAttribute('disabled');
        }
    }


    const miniGoals = document.createElement('div');
    miniGoals.classList.add('miniGoals-div');
    const miniPrompt = document.createElement('p');
    miniPrompt.innerText = 'mini goals needed';
    miniGoals.appendChild(miniPrompt);
    const miniInput = document.createElement('div');
    miniInput.classList.add('miniInput');
    miniGoals.appendChild(miniInput);
    const miniText = document.createElement('input');
    miniText.type = 'text';
    miniText.classList.add('miniText');
    miniInput.appendChild(miniText);
    const miniAdd = document.createElement('i');
    miniAdd.innerHTML = '<i class="fa-thin fa-plus" id="miniAdd">';
    miniInput.appendChild(miniAdd);
    const miniListDiv = document.createElement('ul');
    miniListDiv.classList.add('miniList');
    miniGoals.appendChild(miniListDiv);

    miniAdd.addEventListener('click', createMiniList);

    function createMiniList(event){
        event.preventDefault();
        
        if (miniText.value == ''){
            return false;
        } 

        const miniItemsContainer = document.createElement('div')
        miniItemsContainer.classList.add('miniItemsContainer')
        miniListDiv.appendChild(miniItemsContainer);

        const miniInputItem = document.createElement('li');
        miniInputItem.innerHTML = miniText.value;
        miniInputItem.classList.add('miniListText');
        miniItemsContainer.appendChild(miniInputItem);
        miniText.value = '';

        const miniCheckButton = document.createElement('button');
        miniCheckButton.innerHTML = '<i class="fa-solid fa-check" id="miniCheck"></i>';
        miniCheckButton.classList.add('miniListButton');
        miniCheckButton.classList.add('miniCheck');
        miniItemsContainer.appendChild(miniCheckButton);

        const miniRemoveButton = document.createElement('button');
        miniRemoveButton.innerHTML = '<i class="fa-solid fa-minus" id="miniRemove"></i>';
        miniRemoveButton.classList.add('miniListButton');
        miniRemoveButton.classList.add('miniRemove');
        miniItemsContainer.appendChild(miniRemoveButton);    
}

    miniGoals.addEventListener('click', completeMini);
    miniGoals.addEventListener('click', removeMini);

    const hDeadline = document.createElement('div');
    hDeadline.classList.add('hDeadline-div');
    const hDeadlinePrompt = document.createElement('p');
    hDeadlinePrompt.innerText = 'Hopeful Deadline:';
    hDeadline.appendChild(hDeadlinePrompt);
    const hInput = document.createElement('input');
    hInput.type = 'date';
    hInput.classList.add('hopefulInput');
    hDeadline.appendChild(hInput);

    const rDeadline = document.createElement('div');
    rDeadline.classList.add('rDeadline-div');
    const rDeadlinePrompt = document.createElement('p');
    rDeadlinePrompt.innerText = 'Realistic Deadline:';
    rDeadline.appendChild(rDeadlinePrompt);
    const rInput = document.createElement('input');
    rInput.type = 'date';
    rInput.max = "4000-12-31";
    rInput.classList.add('realisticInput');
    rDeadline.appendChild(rInput);

    detailsDiv.appendChild(why);
    detailsDiv.appendChild(miniGoals);
    detailsDiv.appendChild(hDeadline);
    detailsDiv.appendChild(rDeadline);

    localStorage.setItem('list', '.list'); //is this right? How do i get the info to restore on the page???
}

function deleteRow(e){
    const removeButton = e.target;

    if (removeButton.classList[1] === 'remove'){
        const listItem = removeButton.closest('div');
        const detailItem = listItem.nextElementSibling;        
        listItem.remove();
        detailItem.remove();
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

function details(e){
    const detailsButton = e.target;
    const detailsDiv = document.querySelector('.detailsDiv');

    const listItem = detailsButton.closest('div');
    const connectedDiv = listItem.nextElementSibling;

    if (detailsButton.classList[1] === 'closed'){
        detailsButton.classList.remove('closed'); 
        detailsButton.classList.add('open');
        connectedDiv.style.display = 'block';
        
    }
    else if (detailsButton.classList[1] === 'open'){
        detailsButton.classList.remove('open'); 
        detailsButton.classList.add('closed');
        connectedDiv.style.display = 'none';
    }
}

function removeMini(e){
    const removeButton = e.target;

    if (removeButton.classList[1] === 'miniRemove'){
        const listItem = removeButton.closest('div');      
        listItem.remove();
       
    }
}


function completeMini(e){
        const miniCompleteButton = e.target;
        if (miniCompleteButton.classList[1] === 'miniCheck'){
            const miniListItem = miniCompleteButton.closest('div')
            const miniCheckButton = miniCompleteButton.querySelector('#miniCheck');
            miniListItem.classList.toggle('miniCompletedItem');
            miniCheckButton.classList.toggle('miniCompletedButton'); 
        }
    }



/* if i ever want to limit the mini add use:
    const children = miniListDiv.children.length;
    if (children == 3){
    miniAdd.removeEventListener('click', createMiniList); */