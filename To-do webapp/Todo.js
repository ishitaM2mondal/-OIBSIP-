const taskInput = document.getElementById("taskInput");
const taskDesc = document.getElementById("taskDesc");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const currentDate = document.getElementById("currentDate");

function updateDate() {
  const now = new Date();

  currentDate.innerText =
    "Today: " +
    now.toLocaleDateString() +
    " | " +
    now.toLocaleTimeString();
}

updateDate();
setInterval(updateDate, 1000);

addTaskBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();
  const description = taskDesc.value.trim();

  if (title === "" || description === "") {
    alert("Please fill all fields!");
    return;
  }

  createTask(title, description);

  taskInput.value = "";
  taskDesc.value = "";
});

function createTask(title, description) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const createdTime = new Date().toLocaleString();

  taskCard.innerHTML = `
    <div class="task-content">
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="task-time">
        Added: ${createdTime}
      </div>
    </div>

    <div class="task-actions">
      <button class="complete-btn">Complete</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  pendingTasks.appendChild(taskCard);

  const completeBtn = taskCard.querySelector(".complete-btn");
  const editBtn = taskCard.querySelector(".edit-btn");
  const deleteBtn = taskCard.querySelector(".delete-btn");

  // Complete Task
  completeBtn.addEventListener("click", () => {
    taskCard.classList.add("completed");

    const completedTime = document.createElement("div");
    completedTime.classList.add("task-time");
    completedTime.innerText =
      "Completed: " + new Date().toLocaleString();

    taskCard.querySelector(".task-content").appendChild(completedTime);

    completedTasks.appendChild(taskCard);

    completeBtn.remove();
  });

  // Edit Task
  editBtn.addEventListener("click", () => {
    const newTitle = prompt(
      "Edit task title:",
      taskCard.querySelector("h3").innerText
    );

    const newDesc = prompt(
      "Edit task description:",
      taskCard.querySelector("p").innerText
    );

    if (newTitle !== null && newTitle.trim() !== "") {
      taskCard.querySelector("h3").innerText = newTitle;
    }

    if (newDesc !== null && newDesc.trim() !== "") {
      taskCard.querySelector("p").innerText = newDesc;
    }
  });

  // Delete Task
  deleteBtn.addEventListener("click", () => {
    taskCard.remove();
  });
}