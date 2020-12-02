"use strict"

window.addEventListener("keydown", keydownEventHandler);
window.addEventListener("click", clickEventHandler)

function keydownEventHandler(e) {
    const addBtn       = document.getElementById("button-add");
    const deleteAllBtn = document.getElementById("button-delete-all");
    const deleteCheckedBtn = document.getElementById("button-delete-checked");

    // take care of buttons 
    if ((e.target.classList.contains("button-card")) && (e.key == "Enter")) {
        switch (e.target) { 
            case (addBtn): {
                addTask(e);
                break;
            }
            case (deleteAllBtn): {
                deleteAllTasks(e);
                break;
            }
            case (deleteCheckedBtn): {
                deleteCheckedTasks(e);
                break;
            }
        }
    }
    // task input
    else if (e.target.id === "task-input") {
        hidePopup();
        if (e.key == "Enter") {
            addTask(e);
        }
    }
    // task item edit
    else if (e.target.classList.contains("task-text")) {
        handleTaskEdit(e);
    }
}


function clickEventHandler(e) {
    const addBtn       = document.getElementById("button-add");
    const deleteAllBtn = document.getElementById("button-delete-all");
    const deleteCheckedBtn = document.getElementById("button-delete-checked");

    // take care of button clicks 
    if (e.target.classList.contains("button")) {
        hidePopup();
        switch (e.target) { 
            case (addBtn): {
                addTask(e);
                break;
            }
            case (deleteAllBtn): {
                deleteAllTasks(e);
                break;
            }
            case (deleteCheckedBtn): {
                deleteCheckedTasks(e);
                break;
            }
        }
    }
    // take care of task-item checks
    else if (e.target.classList.contains("task-rectangle")) {
        checkTask(e);
    }
    // take care of task-item removals
    else if (e.target.classList.contains("task-delete")) {
        deleteTask(e);
    }
    // take care of popup hiding
    else if (e.target.id === "task-input-popup") {
        hidePopup(e);
    }
}

function handleTaskEdit(e) {
    if (e.key === "Backspace" && e.target.innerText.length === 0) {
        e.target.parentElement.remove();
    }
    resizeOnOverflow();
}

function deleteCheckedTasks() {
    let tasks = document.querySelectorAll(".task-item")
    for (let task of tasks) {
        if (task.className.includes("checked")) {
            task.remove();
        }
    }    
    resizeOnOverflow();
}

function deleteAllTasks() {
    let tasks = document.querySelectorAll(".task-item")
    for (let task of tasks) {
        task.remove();
    }
    resizeOnOverflow();
}

function checkTask(e) {
    if (e.target.parentElement.className.includes("checked")) {
        e.target.parentElement.classList.remove("checked");
        e.target.setAttribute("title", "Check task");
        e.target.children[0].textContent = "Check task"
    }
    else {
        e.target.parentElement.classList.add("checked");
        e.target.setAttribute("title", "Uncheck task");
        e.target.children[0].textContent = "Uncheck task"
    }
}

function createTask(taskText) {
    const newTask = document.createElement("div");
    newTask.setAttribute("class", "task-item");

    const taskRectangleButton = document.createElement("button");
    taskRectangleButton.setAttribute("class", "task-rectangle");
    taskRectangleButton.setAttribute("title", "Check task");
    
    const taskRectangleSpan = document.createElement("span");
    taskRectangleSpan.setAttribute("class", "sr-only");
    taskRectangleSpan.textContent = "Check Task"; //todo: Uncheck Task if checked
    taskRectangleButton.appendChild(taskRectangleSpan);

    const taskPar = document.createElement("p");
    taskPar.setAttribute("class", "task-text");
    taskPar.setAttribute("contenteditable", "true");
    taskPar.textContent = taskText;

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.setAttribute("class", "task-delete");
    taskDeleteButton.setAttribute("title", "Delete task");

    const taskDeleteSpan = document.createElement("span");
    taskDeleteSpan.setAttribute("class", "sr-only");
    taskDeleteSpan.textContent = "Delete Task";
    taskDeleteButton.appendChild(taskDeleteSpan);

    newTask.appendChild(taskRectangleButton);
    newTask.appendChild(taskPar);
    newTask.appendChild(taskDeleteButton);

    return newTask;
}

function resizeOnOverflow() {
    const tasksList = document.getElementsByClassName("task-list")[0];

    if ( isOverflown(tasksList) ) {
        tasksList.classList.add("narrow");
    }
    else { tasksList.classList.remove("narrow"); }
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const tasksList = document.getElementsByClassName("task-list")[0];

    if (taskInput.value !== "") {
        tasksList.appendChild( createTask(taskInput.value) )
        taskInput.value = "";
        resizeOnOverflow();
    }
    else {
        showPopup();
    }
}

function showPopup() {
    const popup = document.getElementById("task-input-popup");
    popup.classList.add("show");
}

function hidePopup() {
    const popup = document.getElementById("task-input-popup");
    popup.classList.remove("show");
}

function deleteTask(e) {
    e.target.parentElement.remove();
    resizeOnOverflow();
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}