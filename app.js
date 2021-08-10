// Define UI Vars
const addTaskForm = document.querySelector('#addTask');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#ClearTaskBtn');
const filterTaskInput = document.querySelector('#FilterTask');
const taskInput = document.querySelector('#newTask');

//load all event listners
loadAllEventlistners();

//function to load all event
function loadAllEventlistners(){

     // DOM Load event
       document.addEventListener('DOMContentLoaded', getTasks);
    //add submit event on addTaskForm when we submit it addTask function will call
      addTaskForm.addEventListener('submit', addTask);

    //remove task
      taskList.addEventListener('click',removeTask);
    
    //clear task
      clearBtn.addEventListener('click',clearTask);

    //filterTask
       filterTaskInput.addEventListener('keyup',filterTask);
}

// Add Task
function addTask(e) {
    //if task value is null alert
    if(taskInput.value=='') {
      alert('Add a task');
    }
    
    // Create li element
      const li=document.createElement('li');
    // Add class
      li.className='collection-item';
    // Create text node and append to li
      const text=document.createTextNode(taskInput.value);
      li.appendChild(text);
    // Create new link element
      const link=document.createElement('a');
    // Add class
      link.className='delete-item';
    // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
      li.appendChild(link);
    // Append li to ul
      taskList.appendChild(li);
    // Store in LS
      storeTaskInLocalStorage(taskInput.value);
    // Clear input
      taskInput.value = '';
    //prevent default behaviour
      e.preventDefault();
}

//Remove Task
function removeTask(e){
    //click on icon and check its parent element which is "a" tag having class contains delete-item
    //if yes then we will delete whole "li" tag which is the parent of parent of target element 
    //which is icon
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Do you want to remove this task?')) {
          e.target.parentElement.parentElement.remove();
          
          //remove from LS
           removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Clear Task
function clearTask(e){
    // click on clear tast btn the inner html under "ul" is set to none
    // this method is slow so we can do this by another method
    // taskList.innerHTML='';
    // Faster
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
     clearTasksFromLocalStorage();
}

//filter task
function filterTask(e){
    
    //take filterinputvalue
    const filterInputValue=e.target.value.toLowerCase();
    //take all list items
    const listItems=document.querySelectorAll('.collection-item');
    //traverse in list item which is nodelist type
    listItems.forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(filterInputValue) != -1){
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
    });
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    //item stored in LS in form of string so when we get item use JSON.parse to convert it into array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
    //when we store item use JSON.stringify to convert tasks in string and store them in LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      //remove specific element from array we use splice
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//gets task from LS and show to UI 
//when we load DOM we show task in ls to UI 
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
      const li=document.createElement('li');
    // Add class
      li.className='collection-item';
    // Create text node and append to li
      const text=document.createTextNode(task);
      li.appendChild(text);
    // Create new link element
      const link=document.createElement('a');
    // Add class
      link.className='delete-item';
    // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
      li.appendChild(link);
    // Append li to ul
      taskList.appendChild(li);
  });
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}