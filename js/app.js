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
    if (saveInd !== undefined) {
      SaveTodo(text.value, saveInd);
      saveInd = undefined;
    } else {
      SaveTodo(text.value);
    }
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
            <div class ="card-todo">

            <h1>${todo}</h1>


            <div class="options">
              <input class="item" type ="checkbox" id="${i}"/>

              <a class="item" onclick='EditTodo(${i})'> <img src="assets/img/pencil_black.png"></a>

              <a class="item" onclick='DeleteTodo(${i})'><img src="assets/img/bin.png"></a>
            </div>

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
