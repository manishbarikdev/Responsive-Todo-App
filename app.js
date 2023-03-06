const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

let tasks = [];

// Load saved tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  loadTasks();
}

// Add task to the list
function addTask(event) {
  event.preventDefault();
  const task = input.value.trim();
  if (task.length > 0) {
    tasks.push({ task: task, completed: false });
    saveTasks();
    loadTasks();
    input.value = '';
  }
}

// Load saved tasks to the list
function loadTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleTask(index);
    });
    li.appendChild(checkbox);
    const span = document.createElement('span');
    span.innerText = task.task;
    span.contentEditable = true;
    span.addEventListener('blur', () => {
      editTask(index, span.innerText);
    });
    li.appendChild(span);
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
      span.focus();
    });
    li.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });
    li.appendChild(deleteButton);
    if (task.completed) {
      li.classList.add('completed');
    }
    list.appendChild(li);
  });
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from the list
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  loadTasks();
}

// Edit task in the list
function editTask(index, newTask) {
  if (newTask.length > 0) {
    tasks[index].task = newTask;
    saveTasks();
    loadTasks();
  }
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  loadTasks();
}

// Event listeners
form.addEventListener('submit', addTask);
