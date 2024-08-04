document.addEventListener("DOMContentLoaded", () => {
  // Variables for Assignment Dues
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");
  const taskList = document.getElementById("task-list");

  // Variables for To-Do List
  let currentTab = "personal";
  const personalTab = document.getElementById("personal-tab");
  const professionalTab = document.getElementById("professional-tab");
  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo-btn");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const personalList = document.getElementById("personal-list");
  const professionalList = document.getElementById("professional-list");

  // Event Listeners for Assignment Dues
  addTaskBtn.addEventListener("click", addTask);

  function addTask() {
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskName && dueDate) {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${taskName}</td>
          <td>${dueDate}</td>
          <td><input type="checkbox"></td>
          <td><button class="delete-btn">x</button></td>
        `;
      taskList.appendChild(row);

      taskInput.value = "";
      dueDateInput.value = "";

      row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
      });
    }
  }

  // Event Listeners for To-Do List
  personalTab.addEventListener("click", () => switchTab("personal"));
  professionalTab.addEventListener("click", () => switchTab("professional"));
  addTodoBtn.addEventListener("click", addTodo);
  clearCompletedBtn.addEventListener("click", clearCompleted);

  function switchTab(tab) {
    currentTab = tab;

    personalTab.classList.remove("active");
    professionalTab.classList.remove("active");

    personalList.classList.remove("active");
    professionalList.classList.remove("active");

    if (tab === "personal") {
      personalTab.classList.add("active");
      personalList.classList.add("active");
    } else {
      professionalTab.classList.add("active");
      professionalList.classList.add("active");
    }
  }

  function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      const taskList =
        currentTab === "personal" ? personalList : professionalList;

      const listItem = document.createElement("li");
      listItem.classList.add("todo-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onclick = function () {
        listItem.classList.toggle("completed");
      };

      const span = document.createElement("span");
      span.textContent = taskText;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.textContent = "🗑️";
      deleteButton.onclick = function () {
        taskList.removeChild(listItem);
      };

      listItem.appendChild(checkbox);
      listItem.appendChild(span);
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);

      todoInput.value = "";
    }
  }

  function clearCompleted() {
    const taskList =
      currentTab === "personal" ? personalList : professionalList;
    const tasks = taskList.getElementsByTagName("li");

    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].classList.contains("completed")) {
        taskList.removeChild(tasks[i]);
      }
    }
  }
});
