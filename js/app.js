let todoList = [];

const text = document.querySelector("#text");
const saveTaskButton = document.getElementById("save-todo");
const listBox = document.querySelector(".list-todos");
let saveInd = undefined;

const addTaskButton = document.querySelector("#submit");
addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (text.value === "") {
    alert("Insira um todo.");
  } else {
    VerifyTodos();
    saveInd !== undefined
      ? SaveTodo(text.value, saveInd)
      : SaveTodo(text.value);
    displayTodos();
  }
});

const SaveTodo = (item, i) => {
  i !== undefined ? (todoList[i] = item) : todoList.push(item);

  text.value = "";
  localStorage.setItem("todosList", JSON.stringify(todoList));
};

const displayTodos = () => {
  VerifyTodos();

  let htmlCode = "";

  todoList.forEach((todo, i) => {
    htmlCode += `
            <div>

            <p>${todo}</p>

            <button onclick='EditTodo(${i})'>Editar</button>

            <button onclick='DeleteTodo(${i})'>Excluir</button>

            </div>
        `;
  });

  listBox.innerHTML = htmlCode;
};

const VerifyTodos = () => {
  let todosLocalStorage = localStorage.getItem("todosList");

  if (todosLocalStorage === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(todosLocalStorage);
  }
};

const DeleteTodo = (index) => {
  let todo = localStorage.getItem("todosList");
  todoList = JSON.parse(todo);
  todoList.splice(index, 1);
  localStorage.setItem("todosList", JSON.stringify(todoList));
  displayTodos();
};

const EditTodo = (i) => {
  let todo = JSON.parse(localStorage.getItem("todosList"));
  text.value = todo[i];
  saveInd = i;
};
