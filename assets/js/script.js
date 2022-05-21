var taskIdCounter = 0;
var tasks = [];

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
// tasks in progress
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// tasks completed
var tasksCompletedEl = document.querySelector("#tasks-completed");

//adding things to the todo list
var taskFormHandler = function(event) {

    // ignoring browsers default for submit button
    event.preventDefault(); 

    // allowing us to get the words in the text
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value; 

    // checks if inputs are empty 
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!");
    }

    formEl.reset(); 

// reset form fields for next task to be entered
document.querySelector("input[name='task-name']").value= "";
document.querySelector("select[name='task-type']").selectIndex = 0; 

var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do"
}

var isEdit = formEl.hasAttribute("data-task-id");

// has data attribute, so get task id and cakk function to complete edit process
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
}
// no data attribute, so create object as normal and pass createTaskEl function
else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEl(taskDataObj);
}
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matcing task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated!");

    // set for updating and deleting tasks in the DOM, and so that it is done in the tasks array
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content 
    // at each for loop, we are checking to see if that individual task id matches taskId passed into completedEditTask()
    for (var i = 0; i < tasks.length; i++) {
        // parseInt converts to numbers for comparison 
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    // reset form by removing the task id abd changing the button text back
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function(taskDataObj) {
    // create list items
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"; 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // task items id 
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // add list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

//how the new item gets added to the list after a button click
formEl.addEventListener("submit", taskFormHandler);

var createTaskActions = function(taskId) {
    // creates a new <div class="task-actions"> element 
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl); 

    // edit or delete buttons
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "stats-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // delte button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // button that says saves task shows up
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = []; 

    // loop through current tasks 
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and pusj it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign ttasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase 
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element base on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }

    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }

    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);

        // uodate task's in tasks array
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === parseInt(taskId)) {
                tasks[i].status = statusValue;
            }
        }
    }
};

pageContentEl.addEventListener("click", taskButtonHandler); 
pageContentEl.addEventListener("change", taskStatusChangeHandler);