let todoItems = [];

const list = document.querySelector("kl-todo-list");

const form = document.querySelector(".kl-form");

const renderTodo = (todo) => {
  const setTodoHtml = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick kl-tick"></label>
    <span>${todo.text}></span>
    
    <button class="delete-todo kl-delete-todo">
        X
    </button>
    `;

  const item = document.querySelector([`data-key='${todo.id}'`]);

  if (todo.deleted) {
    item.remove();
    return;
  }

  const isChecked = todo.checked ? "done" : "";

  const node = document.createElement("li");

  node.setAttribute("class", `kl-todo-item ${isChecked}`);

  node.setAttribute("data-key", todo.id);

  node.innerHTML = setTodoHtml;

  item ? list.replaceChild(node, item) : list.append(node);
};

// listener

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("kl-tick")) {
    const itemKey = e.target.parentElement.dataset.key;
    toogleDone(itemKey);
  }

  if (e.target.classList.contains("kl-delete-todo")) {
    const itemKey = e.target.parentElement.dataset.key;
    deleteTodos(itemKey);
  }
});

const toogleDone = (key) => {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
};

// add todos
const addTodos = () => {
  const todo = {
    text,
    checked: false,
    id: Date.now,
  };

  todoItems.push(todo);
  renderTodo(todo);
};

//delete
const deleteTodos = (key) => {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };

  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector(".kl-input-todo");
  const text = input.value.trim();
  if (text != "") {
    addTodos(text);
    input.value = "";
    input.focus();
  }
});
