var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//adding things to the todo list
var createTaskHandler = function(event) {

    // ignoring browsers default for submit button
    event.preventDefault(); 

    // allowing us to get the words in the text
    var taskNameInput = document.querySelector("input[name='task-name']");
    var taskNameInput = document.querySelector("input[name='task-name']").value; 

    // allows us to choose a web, print, other property
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create dic to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

//how the new item gets added to the list after a button click
formEl.addEventListener("submit", createTaskHandler);
