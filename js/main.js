"use strict"

const addBtn       = document.getElementById("button-add");
const deleteAllBtn = document.getElementById("button-delete-all");
const taskInput    = document.getElementById("task-input");
const tasksList    = document.getElementsByClassName("task-list")[0];
const deleteCheckedBtn = document.getElementById("button-delete-checked");
const popup        = document.getElementById("task-input-popup");

addBtn.addEventListener("click", addTask);
tasksList.addEventListener("click", checkTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("keydown", handleTaskEdit);
deleteCheckedBtn.addEventListener("click", deleteCheckedTasks);
deleteAllBtn.addEventListener("click", deleteAllTasks);
window.addEventListener("keydown", eventEnter);
popup.addEventListener("click", hidePopup);

function handleTaskEdit(e) {
    if (e.target.className === "task-text") {
        if (e.key === "Backspace" && e.target.innerText.length === 0) {
            e.target.parentElement.remove();
        }
        resizeOnOverflow();
    }
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
    if (e.target.className === "task-rectangle") {
        const taskText = e.target.parentElement.querySelector("p.task-text");
        if (e.target.parentElement.className.includes("checked")) {
            e.target.parentElement.classList.remove("checked");
        }
        else {
            e.target.parentElement.classList.add("checked");
        }
    }
}

function createTask(taskText) {
    const newTask = document.createElement("div");
    newTask.setAttribute("class", "task-item");

    const taskRectangleDiv = document.createElement("div");
    taskRectangleDiv.setAttribute("class", "task-rectangle");
    taskRectangleDiv.setAttribute("title", "Check task");

    const taskPar = document.createElement("p");
    taskPar.setAttribute("class", "task-text");
    taskPar.setAttribute("contenteditable", "true");
    taskPar.textContent = taskText;

    const taskDeleteDiv = document.createElement("div");
    taskDeleteDiv.setAttribute("class", "task-delete");
    taskDeleteDiv.setAttribute("title", "Delete task");

    newTask.appendChild(taskRectangleDiv);
    newTask.appendChild(taskPar);
    newTask.appendChild(taskDeleteDiv);

    return newTask;
}

function resizeOnOverflow() {
    if ( isOverflown(tasksList) ) {
        tasksList.classList.add("narrow");
    }
    else { tasksList.classList.remove("narrow"); }
}

function addTask() {
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
    popup.classList.add("show");
}

function hidePopup() {
    popup.classList.remove("show");
}

function deleteTask(e) {
    if (e.target.className === "task-delete") {
        e.target.parentElement.remove();
        resizeOnOverflow();
    }
}

function eventEnter(e) {
    if (e.target === taskInput) {
        hidePopup();
    }

    if (e.key === "Enter") {
        switch (e.target) {
            case (addBtn): 
            case (taskInput): {
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
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}