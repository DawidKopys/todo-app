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
    if (e.target.nodeName == "P") {
        if (e.target.className.includes("checked")) {
            e.target.classList.remove("checked");
        }
        else {
            e.target.classList.add("checked");
        }
    }
}

function createTask(taskText) {
    let tasksCount = tasksList.childElementCount;

    let newTask = document.createElement("p");
    newTask.setAttribute("class", "task-item");
    newTask.setAttribute("id",  `task${tasksCount}`);
    newTask.textContent = taskText;

    return newTask;
}

function addTask() {
    if (taskInput.value != "") {

        tasksList.appendChild( createTask(taskInput.value) )
        taskInput.value = ""
    }
    else {
        alert("Please, add some task for new task.")
    }
}

