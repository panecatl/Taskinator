var buttonEl = document.querySelector("#save-task");
var tasksToDOEl = document.querySelector("#tasks-to-do");

//adding things to the todo list
var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDOEl.appendChild(listItemEl);
}

//how the new item gets added to the list after a button click
buttonEl.addEventListener("click", createTaskHandler);