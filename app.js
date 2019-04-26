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