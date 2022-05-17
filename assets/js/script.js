var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//adding things to the todo list
var createTaskHandler = function(event) {

    event.preventDefault(); 
    

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}

//how the new item gets added to the list after a button click
formEl.addEventListener("submit", createTaskHandler);
