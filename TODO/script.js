//Like in C, start by defining the global variables
const inputText = document.querySelector('.input');
const inputButton = document.querySelector('.add');
const inputList = document.querySelector('.list');

//This is where I start to advise JS what item will have interactivity
document.addEventListener('DOMContentLoaded', loadList);
inputButton.addEventListener('click', createList);
inputList.addEventListener('click', deleteRow);
inputList.addEventListener('click', completeRow);
inputList.addEventListener('click', details);

//Load initial list 
function createList(event) {
    event.preventDefault();
    if (inputText.value == '') {
        return false;
    }

    const listContainer = document.createElement('div');
    listContainer.classList.add('listContainer');
    inputList.appendChild(listContainer);


    const listDiv = document.createElement('div');
    listDiv.classList.add('listDiv');
    listContainer.appendChild(listDiv);

    const inputItem = document.createElement('li');
    inputItem.innerText = inputText.value;
    saveList(inputItem.innerText);
    inputItem.classList.add('list-text');
    listDiv.appendChild(inputItem);

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



    //Hidden DIV for details connected to previous DIV
    const detailsForm = document.createElement('form');
    detailsForm.classList.add('detailsForm');
    detailsForm.style.display = 'none';
    listContainer.appendChild(detailsForm);

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

    //Loop/Click Event to iterate through the different list points and save the reason section
    for (var i = 0; i < inputList.childNodes.length; i++) {
        if (i != 0) { //this line allows me to apply this refreshed loop to each item instead of skipping over
            continue;
        }
        whyAdd.addEventListener('click', setReason);

        function setReason(event) {

            let addButton = event.target;
            let parent = addButton.closest('div');
            let textField = parent.firstChild;

            if (textField.value == '') {
                return false;
            }

            if (addButton.classList[1] != 'active') {
                addButton.classList.toggle('active');
                parent.classList.toggle('setReasonDiv');
                textField.classList.toggle('setReason');
                textField.toggleAttribute('disabled');
            }

            localStorage.setItem('reasonInput' + [i], whyText.value); //how do i stop loop from disabling this every other
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

    //Loop/Click event/save functoin to iterate over all the minilists points added
    for (var i = 0; i < inputList.childNodes.length; i++) {
        miniAdd.addEventListener('click', createMiniList);

        function createMiniList(event) {
            event.preventDefault();

            if (miniText.value == '') {
                return false;
            }

            const miniItemsContainer = document.createElement('div')
            miniItemsContainer.classList.add('miniItemsContainer')
            miniListDiv.appendChild(miniItemsContainer);

            const miniInputItem = document.createElement('li');
            miniInputItem.innerHTML = miniText.value;
            miniInputItem.classList.add('miniListText');
            miniItemsContainer.appendChild(miniInputItem);

            saveMini(miniInputItem.innerText);

            function saveMini(x) {
                let miniTest;

                if (localStorage.getItem('miniTest' + [i]) === null) {
                    miniTest = [];
                } else {
                    miniTest = JSON.parse(localStorage.getItem('miniTest' + [i]));
                }
                miniTest.push(x);
                localStorage.setItem('miniTest' + [i], JSON.stringify(miniTest));
            }
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

    detailsForm.appendChild(why);
    detailsForm.appendChild(miniGoals);
    detailsForm.appendChild(hDeadline);
    detailsForm.appendChild(rDeadline);

    inputText.value = '';
}

//Function in charge of saving the main list inputs
function saveList(x) {

    let memory;
    if (localStorage.getItem('memory') === null) {
        memory = [];
    } else {
        memory = JSON.parse(localStorage.getItem('memory'));
    }
    memory.push(x);
    localStorage.setItem('memory', JSON.stringify(memory));
}


//Function that fully reloads the first function but now with the saved inputs and ability to continue editing/adding
function loadList() {
    let memory;


    if (localStorage.getItem('memory') === null) {
        memory = [];
    } else {
        memory = JSON.parse(localStorage.getItem('memory'));
    }

    //Loading everything over again
    memory.forEach(function (item) {


        const listContainer = document.createElement('div');
        listContainer.classList.add('listContainer');
        inputList.appendChild(listContainer);


        const listDiv = document.createElement('div');
        listDiv.classList.add('listDiv');
        listContainer.appendChild(listDiv);

        const inputItem = document.createElement('li');
        inputItem.innerText = item //Loads the saved list
        inputItem.classList.add('list-text');
        listDiv.appendChild(inputItem);


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

        const detailsForm = document.createElement('form');
        detailsForm.classList.add('detailsForm');
        detailsForm.style.display = 'none';
        listContainer.appendChild(detailsForm);

        const why = document.createElement('div');
        why.classList.add('why-div');
        const whyPrompt = document.createElement('p');
        whyPrompt.innerText = 'This goal is important to me because...';
        why.appendChild(whyPrompt);
        const whyInput = document.createElement('div');
        whyInput.classList.add('whyInput');
        whyInput.classList.toggle('setReasonDiv');
        why.appendChild(whyInput);
        const whyText = document.createElement('textarea');
        whyText.maxLength = '150';
        whyText.classList.add('whyText');
        //Reloads user input for REASON section    
        for (var i = 0; i <= inputList.childNodes.length; i++) {
            whyText.value = localStorage.getItem('reasonInput' + [i]);
        }
        whyText.classList.toggle('setReason');
        whyText.toggleAttribute('disabled');


        whyInput.appendChild(whyText);
        const whyAdd = document.createElement('i');
        whyAdd.innerHTML = '<i class="fa-thin fa-plus" id="whyAdd">';
        whyAdd.classList.toggle('active');
        whyInput.appendChild(whyAdd);

        //Loop to make sure inputs after reload are saved
        for (var i = 0; i < inputList.childNodes.length; i++) {
            if (i != 0) {
                continue;
            }
            whyAdd.addEventListener('click', setReason);

            function setReason(event) {

                let addButton = event.target;
                let parent = addButton.closest('div');
                let textField = parent.firstChild;

                if (textField.value == '') {
                    addButton.classList.toggle('active');
                    parent.classList.toggle('setReasonDiv');
                    textField.classList.toggle('setReason');
                    textField.toggleAttribute('disabled');
                    return false;
                }

                if (addButton.classList[1] != 'active') {
                    addButton.classList.toggle('active');
                    parent.classList.toggle('setReasonDiv');
                    textField.classList.toggle('setReason');
                    textField.toggleAttribute('disabled');
                }

                localStorage.setItem('reasonInput' + [i], whyText.value);
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

        //reload the mini list
        for (var i = 0; i <= inputList.childNodes.length; i++) {
            //makes sure only sections with user input are affected

                let miniTest;
                if (localStorage.getItem('miniTest' + [i]) === null) {
                    miniTest = [];
                } else {
                    miniTest = JSON.parse(localStorage.getItem('miniTest' + [i]));
                }
                miniTest.forEach(function (e) {
                
                    const miniListDiv = document.createElement('ul');
                    miniListDiv.classList.add('miniList');
                    miniGoals.appendChild(miniListDiv);

                    const miniItemsContainer = document.createElement('div')
                    miniItemsContainer.classList.add('miniItemsContainer')
                    miniListDiv.appendChild(miniItemsContainer);

                    const miniInputItem = document.createElement('li');
                    miniInputItem.innerText = e;
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

                    for (var i = 0; i < inputList.childNodes.length; i++) {

                        miniAdd.addEventListener('click', createMiniList);


                        function createMiniList(event) {
                            event.preventDefault();

                            if (miniText.value == '') {
                                return false;
                            }

                            const miniItemsContainer = document.createElement('div')
                            miniItemsContainer.classList.add('miniItemsContainer')
                            miniListDiv.appendChild(miniItemsContainer);

                            const miniInputItem = document.createElement('li');
                            miniInputItem.innerHTML = miniText.value;
                            miniInputItem.classList.add('miniListText');
                            miniItemsContainer.appendChild(miniInputItem);

                            saveMini(miniInputItem.innerText);

                            function saveMini(x) {
                                let miniTest;

                                if (localStorage.getItem('miniTest' + [i]) === null) {
                                    miniTest = [];
                                } else {
                                    miniTest = JSON.parse(localStorage.getItem('miniTest' + [i]));
                                }
                                miniTest.push(x);
                                localStorage.setItem('miniTest' + [i], JSON.stringify(miniTest));
                            }
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
                    }
                
                });
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

        detailsForm.appendChild(why);
        detailsForm.appendChild(miniGoals);
        detailsForm.appendChild(hDeadline);
        detailsForm.appendChild(rDeadline);


    });

}



//Delets main list input and invivisible detail DIV next to it
function deleteRow(e) {
    const removeButton = e.target;

    if (removeButton.classList[1] === 'remove') {
        const listItem = removeButton.closest('div');
        const listItemParent = listItem.parentNode;

        listItemParent.remove();
    }
}
//Styles list point to show completion
function completeRow(e) {
    const completeButton = e.target;

    if (completeButton.classList[1] === 'check') {
        const listItem = completeButton.closest('div');
        const checkButton = completeButton.querySelector('#check');
        listItem.classList.toggle('completedItem');
        checkButton.classList.toggle('completedButton');
    }
}
//Function that opens and styles the hidden details DIV
function details(e) {
    const detailsButton = e.target;

    const listItem = detailsButton.closest('div');
    const connectedDiv = listItem.nextElementSibling;

    if (detailsButton.classList[1] === 'closed') {
        detailsButton.classList.remove('closed');
        detailsButton.classList.add('open');
        connectedDiv.style.display = 'block';

    } else if (detailsButton.classList[1] === 'open') {
        detailsButton.classList.remove('open');
        detailsButton.classList.add('closed');
        connectedDiv.style.display = 'none';
    }
}

function removeMini(e) {
    const removeButton = e.target;

    if (removeButton.classList[1] === 'miniRemove') {
        const listItem = removeButton.closest('div');
        listItem.remove();

    }
}

function completeMini(e) {
    const miniCompleteButton = e.target;
    if (miniCompleteButton.classList[1] === 'miniCheck') {
        const miniListItem = miniCompleteButton.closest('div')
        const miniCheckButton = miniCompleteButton.querySelector('#miniCheck');
        miniListItem.classList.toggle('miniCompletedItem');
        miniCheckButton.classList.toggle('miniCompletedButton');
    }
}