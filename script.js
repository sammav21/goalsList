//Like in C, start by defining the global variables
const inputText = document.querySelector('.input');
const inputButton = document.querySelector('.add');
const inputList = document.querySelector('.list');

//This is where I start to advise JS what item will have interactivity
document.addEventListener('DOMContentLoaded', loadList);
inputButton.addEventListener('click', createList);
inputList.addEventListener('click', deleteRow);
inputList.addEventListener('click', details);

//Create initial list 
function createList(event) {
    event.preventDefault();
    if (inputText.value == '') {
        return false;
    }
    if (inputList.childNodes.length > 4) {
        alert("Don't spread yourself too thin, focus on the most important goals first.");
        return false;
    }
    //Use this limit on goals to then control exact steps needed to delete reasoninput1,2,3,etc.
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

    const checkIcon = checkButton.querySelector('#check');

    checkButton.addEventListener('click', completeRow);
//Styles list point to show completion
function completeRow() {
   
    if (checkButton.classList[1] === 'check') {
        listDiv.classList.toggle('completedItem');
        checkIcon.classList.toggle('completedButton');
    }

    let memory;
    if (localStorage.getItem('memory') === null) {
        memory = [];
    } else {
        memory = JSON.parse(localStorage.getItem('memory'));
    }

    
    localStorage.setItem('row'+[memory.indexOf(listDiv.innerText)+1], 'complete');
    location.reload();
    //this stores the check mark how I want it, but how do I remove the check if the person wants to reopen the item?
}


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
    whyPrompt.innerText = 'Why does this goal matter?';
    why.appendChild(whyPrompt);
    const whyInput = document.createElement('div');
    whyInput.classList.add('whyInput');
    why.appendChild(whyInput);
    const whyText = document.createElement('textarea');
    whyText.maxLength = '150';
    whyText.classList.add('whyText');
    whyInput.appendChild(whyText);
    const whyAdd = document.createElement('button');
    whyAdd.innerHTML = '<i class="fa-thin fa-plus" id="whyAdd">';
    whyInput.appendChild(whyAdd);

    //Loop/Click Event to iterate through the different list points and save the reason section
    for (var i = 0; i < inputList.childNodes.length; i++) {
        if (i != 0) { //this line allows me to apply this refreshed loop to each item instead of skipping over
            continue;
        }
        whyAdd.addEventListener('click', setReason);

        function setReason(event) {
            event.preventDefault();
            let addButton = event.target;
            let button = addButton.closest('button');
            let parent = addButton.closest('div');
            let textField = parent.firstChild;

            if (textField.value == '') {
                return false;
            }

            if (addButton.classList[0] != 'active') {
                button.classList.toggle('active');
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
    miniPrompt.innerText = 'Stepping Stone';
    miniGoals.appendChild(miniPrompt);
    const miniInput = document.createElement('div');
    miniInput.classList.add('miniInput');
    miniGoals.appendChild(miniInput);
    const miniText = document.createElement('input');
    miniText.type = 'text';
    miniText.classList.add('miniText');
    miniInput.appendChild(miniText);
    const miniAdd = document.createElement('button');
    miniAdd.innerHTML = '<i class="fa-thin fa-plus" id="miniAdd">';
    miniInput.appendChild(miniAdd);

    miniAdd.addEventListener('click', setMini);
    //Function to dynamically add mini list inside of details div
    function setMini(event) {
        event.preventDefault();
        let addButton = event.target;
        let parent = addButton.closest('div');
        let textField = parent.firstChild;

        if (textField.value == '') {
            return false;
        }

        if (addButton.classList[1] != 'active') {
            addButton.classList.toggle('active');
            parent.classList.toggle('setStep');
            textField.classList.toggle('setStepText');
            textField.toggleAttribute('disabled');
        }
        localStorage.setItem('miniTest' + [i], miniText.value);
    }


    const hDeadline = document.createElement('div');
    hDeadline.classList.add('hDeadline-div');
    const hDeadlinePrompt = document.createElement('p');
    hDeadlinePrompt.innerText = 'Hopeful Deadline:';
    hDeadline.appendChild(hDeadlinePrompt);
    const hInput = document.createElement('input');
    hInput.type = 'date';
    hInput.classList.add('hopefulInput');
    hDeadline.appendChild(hInput);

    
    hInput.addEventListener('change', hDateSave);
        
        function hDateSave(){
            localStorage.setItem('hDate'+[i],hInput.value);
        }

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

    rInput.addEventListener('change', rDateSave);
        
        function rDateSave(){
            localStorage.setItem('rDate'+[i],rInput.value);
        }

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
        inputItem.innerText = item; //Loads the saved list
        inputItem.classList.add('list-text');
        listDiv.appendChild(inputItem);


        const detailsButton = document.createElement('button');
        detailsButton.innerHTML = '<i class="fa-solid fa-caret-down" id="details"></i>';
        detailsButton.classList.add('listButton');
        detailsButton.classList.add('closed');

        listDiv.appendChild(detailsButton);

        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fa-solid fa-check"id="check"></i>';
        checkButton.classList.add('listButton');
        checkButton.classList.add('check');
        listDiv.appendChild(checkButton);

        const checkIcon = checkButton.querySelector('#check');

        checkButton.addEventListener('click', completeRow);

//Styles list point to show completion
    function completeRow() {
   
    if (checkButton.classList[1] === 'check') {
        listDiv.classList.toggle('completedItem');
        checkIcon.classList.toggle('completedButton');
    }

    let memory;
    if (localStorage.getItem('memory') === null) {
        memory = [];
    } else {
        memory = JSON.parse(localStorage.getItem('memory'));
    }

    
    localStorage.setItem('row'+[memory.indexOf(listDiv.innerText)+1], 'complete');
    location.reload();
    //this stores the check mark how I want it, but how do I remove the check if the person wants to reopen the item?
}

if (localStorage.getItem('row'+[memory.indexOf(listDiv.innerText)+1]) ==='complete'){
    checkButton.addEventListener('click', resetRow);
    function resetRow(){
    let memory;
    if (localStorage.getItem('memory') === null) {
        memory = [];
    } else {
        memory = JSON.parse(localStorage.getItem('memory'));
    }
 localStorage.setItem('row'+[memory.indexOf(listDiv.innerText)+1], 'null');
 location.reload();
}

}
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa-solid fa-minus" id="remove"></i>';
        removeButton.classList.add('listButton');
        removeButton.classList.add('remove');
        listDiv.appendChild(removeButton);

            if (localStorage.getItem('row'+[memory.indexOf(listDiv.innerText)+1]) ==='complete') {
                listDiv.classList.toggle('completedItem');
                checkIcon.classList.toggle('completedButton');
            }
        
          
        const detailsForm = document.createElement('form');
        detailsForm.classList.add('detailsForm');
        detailsForm.style.display = 'none';
        listContainer.appendChild(detailsForm);

        const why = document.createElement('div');
        why.classList.add('why-div');
        const whyPrompt = document.createElement('p');
        whyPrompt.innerText = 'Why does this goal matter?';
        why.appendChild(whyPrompt);
        const whyInput = document.createElement('div');
        whyInput.classList.add('whyInput');

        why.appendChild(whyInput);
        const whyText = document.createElement('textarea');
        whyText.maxLength = '150';
        whyText.classList.add('whyText');
        //Reloads user input for REASON section    
        whyInput.appendChild(whyText);

        const whyAdd = document.createElement('button');
        whyAdd.innerHTML = '<i class="fa-thin fa-plus" id="whyAdd">';

        whyInput.appendChild(whyAdd);

        //Loop to make sure WHY inputs after reload are saved
        for (var i = 0; i < inputList.childNodes.length; i++) {

            if (i != 0) {
                continue;
            }

            whyAdd.addEventListener('click', setReason);

            function setReason(event) {
                event.preventDefault();
                let addButton = event.target;
                let button = addButton.closest('button');
                let parent = addButton.closest('div');
                let textField = parent.firstChild;

                if (textField.value == '') {
                    button.classList.toggle('active');
                    parent.classList.toggle('setReasonDiv');
                    textField.classList.toggle('setReason');
                    textField.toggleAttribute('disabled');
                    return false;
                }


                if (addButton.classList[1] != 'active') {
                    button.classList.toggle('active');
                    parent.classList.toggle('setReasonDiv');
                    textField.classList.toggle('setReason');
                    textField.toggleAttribute('disabled');

                }

                localStorage.setItem('reasonInput' + [i], whyText.value);
            }
        }
        //this checks to see if there is a why input, and if so it'll style it differently from above
        if (localStorage.getItem('reasonInput' + [i]) != 'null' && localStorage.getItem('reasonInput' + [i]) != null) {
            whyAdd.classList.toggle('active');
            whyInput.classList.toggle('setReasonDiv');
            whyText.classList.toggle('setReason');
            whyText.toggleAttribute('disabled');

            whyText.value = localStorage.getItem('reasonInput' + [i]);
        }

    const miniGoals = document.createElement('div');
    miniGoals.classList.add('miniGoals-div');
    const miniPrompt = document.createElement('p');
    miniPrompt.innerText = 'Stepping Stone';
    miniGoals.appendChild(miniPrompt);
    const miniInput = document.createElement('div');
    miniInput.classList.add('miniInput');
    miniGoals.appendChild(miniInput);
    const miniText = document.createElement('input');
    miniText.type = 'text';
    miniText.classList.add('miniText');
    miniInput.appendChild(miniText);
    const miniAdd = document.createElement('button');
    miniAdd.innerHTML = '<i class="fa-thin fa-plus" id="miniAdd">';
    miniInput.appendChild(miniAdd);

    miniAdd.addEventListener('click', setMini);
 
    function setMini(event) {
        event.preventDefault();
        let addButton = event.target;
        let parent = addButton.closest('div');
        let textField = parent.firstChild;

        if (textField.value == '') {
            addButton.classList.toggle('active');
            parent.classList.toggle('setStep');
            textField.classList.toggle('setStepText');
            textField.toggleAttribute('disabled');
            return false;
        }

        if (addButton.classList[1] != 'active') {
            addButton.classList.toggle('active');
            parent.classList.toggle('setStep');
            textField.classList.toggle('setStepText');
            textField.toggleAttribute('disabled');
        }
        localStorage.setItem('miniTest' + [i], miniText.value);
    }
    if (localStorage.getItem('miniTest' + [i]) != 'null' && localStorage.getItem('miniTest' + [i]) != null) {
        miniAdd.classList.toggle('active');
        miniInput.classList.toggle('setStep');
        miniText.classList.toggle('setStepText');
        miniText.toggleAttribute('disabled');

        miniText.value = localStorage.getItem('miniTest' + [i]);
    }

        const hDeadline = document.createElement('div');
        hDeadline.classList.add('hDeadline-div');
        const hDeadlinePrompt = document.createElement('p');
        hDeadlinePrompt.innerText = 'Hopeful Deadline:';
        hDeadline.appendChild(hDeadlinePrompt);
        const hInput = document.createElement('input');
        hInput.type = 'date';
        hInput.classList.add('hopefulInput');
        hInput.value = localStorage.getItem('hDate'+[i]);
        hDeadline.appendChild(hInput);

        hInput.addEventListener('change', hDateSave);
        
        function hDateSave(){
            localStorage.setItem('hDate'+[i],hInput.value);
        }

        
        const rDeadline = document.createElement('div');
        rDeadline.classList.add('rDeadline-div');
        const rDeadlinePrompt = document.createElement('p');
        rDeadlinePrompt.innerText = 'Realistic Deadline:';
        rDeadline.appendChild(rDeadlinePrompt);
        const rInput = document.createElement('input');
        rInput.type = 'date';
        rInput.max = "4000-12-31";
        rInput.classList.add('realisticInput');
        rInput.value = localStorage.getItem('rDate'+[i]);
        rDeadline.appendChild(rInput);

        rInput.addEventListener('change', rDateSave);
        
        function rDateSave(){
            localStorage.setItem('rDate'+[i],rInput.value);
        }

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
        removeStorage(listItemParent);
        listItemParent.remove();
    }
}

//find way to save check to storage similar to remove from storage???
function removeStorage(x) {
    let memory;
    if (localStorage.getItem('memory') === null) {
        memory = [];
    } else {
        memory = JSON.parse(localStorage.getItem('memory'));
    }

    const itemIndex = x.children[0].innerText;

    //This is an overly complex way of deleting and passing down the values but until I learn react this will do. I had to limit the amount of inputs allowed so that I can write out the exact steps of each delete. There is likely a loop for this but after a solid month of working on this, this will do for now.
    if (memory.indexOf(itemIndex) == 0){ 
        localStorage.removeItem('reasonInput1');
        localStorage.setItem('reasonInput1', localStorage.getItem('reasonInput2'));
        localStorage.removeItem('miniTest1');
        localStorage.setItem('miniTest1', localStorage.getItem('miniTest2'));
        localStorage.removeItem('row1');
        localStorage.setItem('row1', localStorage.getItem('row2'));
        localStorage.removeItem('hDate1');
        localStorage.setItem('hDate1', localStorage.getItem('hDate2'));
        localStorage.removeItem('rDate1');
        localStorage.setItem('rDate1', localStorage.getItem('rDate2'));

        localStorage.removeItem('reasonInput2');
        localStorage.setItem('reasonInput2', localStorage.getItem('reasonInput3'));
        localStorage.removeItem('miniTest2');
        localStorage.setItem('miniTest2', localStorage.getItem('miniTest3'));
        localStorage.removeItem('row2');
        localStorage.setItem('row2', localStorage.getItem('row3'));
        localStorage.removeItem('hDate2');
        localStorage.setItem('hDate2', localStorage.getItem('hDate3'));
        localStorage.removeItem('rDate2');
        localStorage.setItem('rDate2', localStorage.getItem('rDate3'));

        localStorage.removeItem('reasonInput3');
        localStorage.setItem('reasonInput3', localStorage.getItem('reasonInput4'));
        localStorage.removeItem('miniTest3');
        localStorage.setItem('miniTest3', localStorage.getItem('miniTest4'));
        localStorage.removeItem('row3');
        localStorage.setItem('row3', localStorage.getItem('row4'));
        localStorage.removeItem('hDate3');
        localStorage.setItem('hDate3', localStorage.getItem('hDate4'));
        localStorage.removeItem('rDate3');
        localStorage.setItem('rDate3', localStorage.getItem('rDate4'));

        localStorage.removeItem('reasonInput4');
        localStorage.setItem('reasonInput4', localStorage.getItem('reasonInput5'));
        localStorage.removeItem('miniTest4');
        localStorage.setItem('miniTest4', localStorage.getItem('miniTest5'));
        localStorage.removeItem('row4');
        localStorage.setItem('row4', localStorage.getItem('row5'));
        localStorage.removeItem('hDate4');
        localStorage.setItem('hDate4', localStorage.getItem('hDate5'));
        localStorage.removeItem('rDate4');
        localStorage.setItem('rDate4', localStorage.getItem('rDate5'));

        localStorage.removeItem('reasonInput5');
        localStorage.removeItem('miniTest5');
        localStorage.removeItem('row5');
        localStorage.removeItem('hDate5');
        localStorage.removeItem('rDate5');
        
        }

        if (memory.indexOf(itemIndex) == 1){ 
            localStorage.removeItem('reasonInput2');
            localStorage.setItem('reasonInput2', localStorage.getItem('reasonInput3'));
            localStorage.removeItem('miniTest2');
            localStorage.setItem('miniTest2', localStorage.getItem('miniTest3'));
            localStorage.removeItem('row2');
            localStorage.setItem('row2', localStorage.getItem('row3'));
            localStorage.removeItem('hDate2');
            localStorage.setItem('hDate2', localStorage.getItem('hDate3'));
            localStorage.removeItem('rDate2');
            localStorage.setItem('rDate2', localStorage.getItem('rDate3'));
    
            localStorage.removeItem('reasonInput3');
            localStorage.setItem('reasonInput3', localStorage.getItem('reasonInput4'));
            localStorage.removeItem('miniTest3');
            localStorage.setItem('miniTest3', localStorage.getItem('miniTest4'));
            localStorage.removeItem('row3');
            localStorage.setItem('row3', localStorage.getItem('row4'));
            localStorage.removeItem('hDate3');
            localStorage.setItem('hDate3', localStorage.getItem('hDate4'));
            localStorage.removeItem('rDate3');
            localStorage.setItem('rDate3', localStorage.getItem('rDate4'));
    
            localStorage.removeItem('reasonInput4');
            localStorage.setItem('reasonInput4', localStorage.getItem('reasonInput5'));
            localStorage.removeItem('miniTest4');
            localStorage.setItem('miniTest4', localStorage.getItem('miniTest5'));
            localStorage.removeItem('row4');
            localStorage.setItem('row4', localStorage.getItem('row5'));
            localStorage.removeItem('hDate4');
            localStorage.setItem('hDate4', localStorage.getItem('hDate5'));
            localStorage.removeItem('rDate4');
            localStorage.setItem('rDate4', localStorage.getItem('rDate5'));
    
            localStorage.removeItem('reasonInput5');
            localStorage.removeItem('miniTest5');
            localStorage.removeItem('row5');
            localStorage.removeItem('hDate5');
            localStorage.removeItem('rDate5');

            }
        if (memory.indexOf(itemIndex) == 2){ 
            localStorage.removeItem('reasonInput3');
            localStorage.setItem('reasonInput3', localStorage.getItem('reasonInput4'));
            localStorage.removeItem('miniTest3');
            localStorage.setItem('miniTest3', localStorage.getItem('miniTest4'));
            localStorage.removeItem('row3');
            localStorage.setItem('row3', localStorage.getItem('row4'));
            localStorage.removeItem('hDate3');
            localStorage.setItem('hDate3', localStorage.getItem('hDate4'));
            localStorage.removeItem('rDate3');
            localStorage.setItem('rDate3', localStorage.getItem('rDate4'));
    
            localStorage.removeItem('reasonInput4');
            localStorage.setItem('reasonInput4', localStorage.getItem('reasonInput5'));
            localStorage.removeItem('miniTest4');
            localStorage.setItem('miniTest4', localStorage.getItem('miniTest5'));
            localStorage.removeItem('row4');
            localStorage.setItem('row4', localStorage.getItem('row5'));
            localStorage.removeItem('hDate4');
            localStorage.setItem('hDate4', localStorage.getItem('hDate5'));
            localStorage.removeItem('rDate4');
            localStorage.setItem('rDate4', localStorage.getItem('rDate5'));
    
            localStorage.removeItem('reasonInput5');
            localStorage.removeItem('miniTest5');
            localStorage.removeItem('row5');
            localStorage.removeItem('hDate5');
            localStorage.removeItem('rDate5');
            }
        if (memory.indexOf(itemIndex) == 3){ 
            localStorage.removeItem('reasonInput4');
            localStorage.setItem('reasonInput4', localStorage.getItem('reasonInput5'));
            localStorage.removeItem('miniTest4');
            localStorage.setItem('miniTest4', localStorage.getItem('miniTest5'));
            localStorage.removeItem('row4');
            localStorage.setItem('row4', localStorage.getItem('row5'));
            localStorage.removeItem('hDate4');
            localStorage.setItem('hDate4', localStorage.getItem('hDate5'));
            localStorage.removeItem('rDate4');
            localStorage.setItem('rDate4', localStorage.getItem('rDate5'));
    
            localStorage.removeItem('reasonInput5');
            localStorage.removeItem('miniTest5');
            localStorage.removeItem('row5');
            localStorage.removeItem('hDate5');
            localStorage.removeItem('rDate5');
            }
        if (memory.indexOf(itemIndex) == 4){ 
            localStorage.removeItem('reasonInput5');
            localStorage.removeItem('miniTest5');
            localStorage.removeItem('row5');
            localStorage.removeItem('hDate5');
            localStorage.removeItem('rDate5');
                }
    memory.splice(memory.indexOf(itemIndex), 1);
    localStorage.setItem('memory', JSON.stringify(memory));
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


/* left to do, figure out how to delete the completed version of the item without having to fully delete the item. Figure out how to save the date picker options to storage*/