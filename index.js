let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
     
  const taskContainer = document.getElementById("ToDos");
  taskContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "completed" && !task.completed) ||
      (filter === "incomplete" && task.completed)
    ) return;

    const taskDiv = document.createElement("div");
taskDiv.className = "flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg shadow-sm";

    taskDiv.className = "task";

    // === LEFT: Checkbox + Task Text ===

    const leftSection = document.createElement("div");
leftSection.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;
checkbox.className = "w-4 h-4";

    checkbox.onchange = () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks(filter);
    };

    const taskText = document.createElement("span");
taskText.innerText = task.text;
taskText.className = "flex-1 ml-2";
if (task.completed) taskText.classList.add("line-through", "text-gray-400");

leftSection.appendChild(checkbox);
leftSection.appendChild(taskText);

// === RIGHT: Edit + Delete Buttons ===

const buttonWrapper = document.createElement("div");
buttonWrapper.className = "flex gap-3";

const editBtn = document.createElement("button");
editBtn.innerText = "Edit";
editBtn.className = "text-blue-500 hover:underline";

    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks(filter);
      }
    };

   const deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";
deleteBtn.className = "text-red-500 hover:underline";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    };

    buttonWrapper.appendChild(editBtn);
buttonWrapper.appendChild(deleteBtn);

    // taskDiv.appendChild(checkbox);
    // taskDiv.appendChild(taskText);
    // taskDiv.appendChild(editBtn);
    // taskDiv.appendChild(deleteBtn);

    // taskDiv.appendChild(checkbox);

// const contentWrapper = document.createElement("div");
// contentWrapper.className = "flex items-center justify-between w-full gap-4";

// const textAndButtons = document.createElement("div");
// textAndButtons.className = "flex items-center justify-between w-full";

// taskText.classList.add("flex-1");

// const buttonWrapper = document.createElement("div");
// buttonWrapper.className = "flex gap-2";

// buttonWrapper.appendChild(editBtn);
// buttonWrapper.appendChild(deleteBtn);

// textAndButtons.appendChild(taskText);
// textAndButtons.appendChild(buttonWrapper);

// contentWrapper.appendChild(textAndButtons);
// taskDiv.appendChild(contentWrapper);

// === Final Assembly ===
taskDiv.appendChild(leftSection);
taskDiv.appendChild(buttonWrapper);


    taskContainer.appendChild(taskDiv);
  });
}

function addTask() {
  const input = document.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  input.value = "";
}

function filterTasks(mode) {
  renderTasks(mode);
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
