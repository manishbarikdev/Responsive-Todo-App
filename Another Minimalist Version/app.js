const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const newTodoInput = document.getElementById('new-todo');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodoList() {
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = todo.completed;
    todoCheckbox.addEventListener('change', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodoList();
    });

    const todoText = document.createElement('p');
    todoText.innerText = todo.text;
    todoText.contentEditable = true;
    todoText.addEventListener('blur', () => {
      todos[index].text = todoText.innerText;
      saveTodos();
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'del-btn';
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodoList();
    });

    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoItem(event) {
  event.preventDefault();

  const newTodoText = newTodoInput.value.trim();

  if (newTodoText !== '') {
    todos.push({
      text: newTodoText,
      completed: false,
    });
    saveTodos();
    newTodoInput.value = '';
    renderTodoList();
  }
}

todoForm.addEventListener('submit', addTodoItem);

renderTodoList();
