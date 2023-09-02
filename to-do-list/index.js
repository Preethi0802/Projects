const taskForm = document.getElementById("new-task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const prioritySelect = document.getElementById("priority-select");
console.log

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Update the display of tasks with animations
// Update the display of tasks with animations and sorting by priority
function displayTasks() {
  taskList.innerHTML = "";

  // Sort tasks by priority: high > medium > low
  tasks.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    const isDone = task.text && task.text.startsWith("[Done] ");
    const taskContent = isDone ? task.text.slice(7) : task.text;

    taskItem.innerHTML = `
      <input type="checkbox" class="mark-done" ${isDone ? "checked" : ""}>
      <span>${taskContent}</span>
      <span class="priority">${task.priority}</span>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    // Apply animations for task display
    taskItem.classList.add("fade-in", "slide-down");
    taskList.appendChild(taskItem);
  });
}


// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Add or update a task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  const index = document.getElementById("task-index").value;

  if (taskText !== "") {
    if (index !== "") {
      tasks[index] = { text: taskText, priority: priority };
      document.getElementById("task-index").value = "";
    } else {
      tasks.push({ text: taskText, priority: priority });
    }

    // Apply animations for task addition
    const newTaskElement = document.createElement("li");
    newTaskElement.classList.add("fade-in", "slide-down");
    newTaskElement.innerHTML = `
      <input type="checkbox" class="mark-done">
      <span>${taskText}</span>
      <span class="priority">${priority}</span>
      <button class="edit-btn" data-index="${tasks.length - 1}">Edit</button>
      <button class="delete-btn" data-index="${tasks.length - 1}">Delete</button>
    `;
    taskList.appendChild(newTaskElement);

    taskInput.value = "";
    prioritySelect.value = "low";
    saveTasks();
  }
});

// Delete a task
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    tasks.splice(index, 1);
    saveTasks();

    // Apply animation to delete task
    const taskItem = e.target.closest("li");
    taskItem.classList.add("slide-up-fade-out");
    setTimeout(() => {
      taskItem.remove();
    }, 500); // Remove the element after animation completes
  }
});

// Edit a task
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const index = e.target.getAttribute("data-index");
    taskInput.value = tasks[index].text;
    prioritySelect.value = tasks[index].priority;
    document.getElementById("task-index").value = index;
  }
});

// Mark task as completed
taskList.addEventListener("change", (e) => {
  if (e.target.classList.contains("mark-done")) {
    const index = e.target.nextElementSibling.nextElementSibling.getAttribute("data-index");
    tasks[index].text = tasks[index].text.replace(/\[Done\] /, ""); // Remove [Done] from task text
    if (e.target.checked) {
      tasks[index].text = `[Done] ${tasks[index].text}`; // Add [Done] to task text
      // Apply slide-off animation and remove task after animation completes
      const taskItem = e.target.closest(".task-item");
      taskItem.classList.add("slide-off");
      setTimeout(() => {
        tasks.splice(index, 1); // Remove task from tasks array
        saveTasks();
        taskItem.remove();
      }, 500); // Adjust the delay to match the animation duration
    } else {
      saveTasks();
    }
  }
});


// Initial display of tasks
displayTasks();