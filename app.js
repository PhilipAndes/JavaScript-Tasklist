// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter task event
    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(e) {
    if(taskInput.value === '') {// if taskInput value is empty give an alert
        alert('Add a task first please');
    }

    // Create li element when task added
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));//the textNode should be the taskInput.value
    // Create new link (the delete icon from fontawesome)
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content'; //if you want something on the right from the list item and materialize you need the secondary-content class
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';// this is the x-mark icon from fontawesome
    // Append the link to li
    li.appendChild(link);

    // Append the li to the UI
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = '';

    e.preventDefault(); //prevent form submit
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {// Here we want to target the <a> from the HTML, so we need to get the parentElement from the icon <i> which must have (contains) a class of 'delete-item'

    // Then when we click the icon we want the whole li to be removed, so we have to target the parent from the parent as below

    //We also want a conformation when we delete something from the list so we use a if statement. 
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Tasks
function clearTasks() {
    //One way of doing this is like this: taskList.innerHTML = '';

    //Or we can loop true with a do while loop, and remove each one which is a faster way
    while(taskList.firstChild) { //firstChild is gonna get the first child of the tasklist

        //while there still is a first child, meaning while there still is something in the list
        taskList.removeChild(taskList.firstChild);
    }
}

// Filter Tasks
function filterTasks(e) { // e = the event paramater
    const text = e.target.value.toLowerCase(); //this will give us whatever is typed in (always in lower case)
    
    //take all of the list items with the classname collection-item and loop true these with a forEach loop, the reason we can use this is because querySelectorAll returns a node list
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){ // if item to lower case, because we also did this with the filter value, then the text that is being typed we want to pass into indexOf, now if there is no match it's gonna equal -1, so we want to say, if it's not equal to -1 then we want that task to show
            task.style.display = 'block';
        } else { // Else if there is no match, we want to hide it 
            task.style.display = 'none';
        }
    });
}