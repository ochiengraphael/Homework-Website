const taskInput = document.getElementById("taskInput");
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupNote = document.getElementById("popupNote");
const closePopup = document.getElementById("closePopup");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task";
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.title}</span>

            <div class="task-buttons">
                <button class="btn" onclick="showNote(${index})">📝</button>
                <button class="btn" onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    if (taskInput.value.trim() === "") return;

    tasks.push({
        title: taskInput.value,
        note: noteInput.value,
        completed: false
    });

    taskInput.value = "";
    noteInput.value = "";
    saveTasks();
    displayTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    displayTasks();
}

function toggleComplete(i) {
    tasks[i].completed = !tasks[i].completed;
    saveTasks();
    displayTasks();
}

function showNote(i) {
    popupTitle.textContent = tasks[i].title;
    popupNote.textContent = tasks[i].note || "No notes added.";
    popup.classList.remove("hidden");
}

closePopup.onclick = () => popup.classList.add("hidden");

addBtn.onclick = addTask;

displayTasks();
