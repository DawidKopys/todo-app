"use strict"

const addBtn       = document.getElementById("button-add");
const deleteAllBtn = document.getElementById("button-delete-all");
const taskInput    = document.getElementById("task-input");
const tasksList    = document.getElementsByClassName("task-list")[0];
const deleteCheckedBtn = document.getElementById("button-delete-checked"); 

addBtn.addEventListener("click", addTask);
tasksList.addEventListener("click", checkTask);
deleteCheckedBtn.addEventListener("click", deleteCheckedTasks);
deleteAllBtn.addEventListener("click", deleteAllTasks);
window.addEventListener("keypress", eventEnter)

function deleteCheckedTasks() {
    let tasks = document.querySelectorAll(".task-item")
    for (let task of tasks) {
        if (task.className.includes("checked")) {
            task.remove();
        }
    }    
}

function deleteAllTasks() {
    let tasks = document.querySelectorAll(".task-item")
    for (let task of tasks) {
        task.remove();
    }
}

function checkTask(e) {
    if ((e.target.className === "task-text") || (e.target.className === "task-rectangle")) {
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

    const taskPar = document.createElement("p");
    taskPar.setAttribute("class", "task-text");
    taskPar.textContent = taskText;

    newTask.appendChild(taskRectangleDiv);
    newTask.appendChild(taskPar);

    return newTask;
}

function addTask() {
    if (taskInput.value !== "") {
        tasksList.appendChild( createTask(taskInput.value) )
        taskInput.value = ""
    }
    else {
        alert("Please, add some task for new task.")
    }
}

function eventEnter(e) {
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


