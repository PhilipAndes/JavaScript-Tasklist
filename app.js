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
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks); //this event will be called right away after the DOM has loaded, and we gonna get getTasks

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter task event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks() {
    let tasks;
    // Check local storage to see if there are tasks in there with a if statement
    if(localStorage.getItem('tasks') === null ){// so if tasks is equal to null, which means there is nothing in there. Then we set the tasks variable to an empty array
        tasks = [];
    } else { // Else we want to set tasks to whatever is in local storage, and remember local storage can only store strings, so we gonna have to parse it as JSON when it comes out
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Then we want to loop true the tasks that are there with a forEach loop
    tasks.forEach(function(task){
        // Create li element when task added
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link (the delete icon from fontawesome)
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content'; //if you want something on the right from the list item and materialize you need the secondary-content class
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';// this is the x-mark icon from fontawesome
        // Append the link to li
        li.appendChild(link);

        // Append the li to ul
        taskList.appendChild(li);
    });
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

    // Append the li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value); //we want to store the value from the taskInput

    // Clear the input
    taskInput.value = '';

    e.preventDefault(); //prevent form submit
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    // Check local storage to see if there are tasks in there with a if statement
    if(localStorage.getItem('tasks') === null ){// so if tasks is equal to null, which means there is nothing in there. Then we set the tasks variable to an empty array
        tasks = [];
    } else { // Else we want to set tasks to whatever is in local storage, and remember local storage can only store strings, so we gonna have to parse it as JSON when it comes out
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // After that we want to push on to that variable so
    tasks.push(task);

    //after that we want to set it back to localstorage (as string) so
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {// Here we want to target the <a> from the HTML, so we need to get the parentElement from the icon <i> which must have (contains) a class of 'delete-item'

    // Then when we click the icon we want the whole li to be removed, so we have to target the parent from the parent as below

    //We also want a conformation when we delete something from the list so we use a if statement. 
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Right after we remove it from the DOM we also want to delete it from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);//This looks weird as we dont have an actual ID to put in, so we get the element from the DOM
        }
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    // Check local storage to see if there are tasks in there with a if statement
    if(localStorage.getItem('tasks') === null ){// so if tasks is equal to null, which means there is nothing in there. Then we set the tasks variable to an empty array
        tasks = [];
    } else { // Else we want to set tasks to whatever is in local storage, and remember local storage can only store strings, so we gonna have to parse it as JSON when it comes out
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //Then we going to loop true the tasks
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){ //with this if statement we want to check if it equals the current task in the iteration, if it does, we know that is the one we want to delete, so we gonna say
            tasks.splice(index, 1); //we can get the index, by setting it as the second paramater on the forEach callback, the 1 says we want to delete 1 from the index 

        }
    });
    //then all we have to do is go under the forEach and set local storage again
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    //One way of doing this is like this: taskList.innerHTML = '';

    //Or we can loop true with a do while loop, and remove each one which is a faster way
    while(taskList.firstChild) { //firstChild is gonna get the first child of the tasklist

        //while there still is a first child, meaning while there still is something in the list
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage
    clearTasksFromLocalStorage();
}

//Clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear(); //this will clear out everything from local storage
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