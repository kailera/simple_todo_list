const { default: renderTodo } = require("./renderTodos");

let todoItems = [];

const addTodos = () => {
  const todo = {
    text,
    checked: false,
    id: Date.now,
  };

  todoItems.push(todo);
  renderTodo(todo);
};

const form = document.querySelector(".kl-form");

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
