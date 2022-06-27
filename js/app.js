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
  if (i !== undefined) {
    todoList.map((todo) => {
      if (todo.id == i) {
        todo.item = item;
      }
    });
  } else {
    const todo = {
      item,
      checked: false,
      id: Date.now(),
    };
    todoList.push(todo);
  }

  text.value = "";
  localStorage.setItem("todosList", JSON.stringify(todoList));
};

const displayTodos = () => {
  VerifyTodos();

  let htmlCode = "";

  todoList.forEach((todo, i) => {
    const isChecked = todo.checked ? "done" : "";
    htmlCode += `
            <div class ="card-todo ${isChecked}">

            <h1>${todo.item}</h1>


            <div class="options">
              <input class="item tick"  type ="checkbox" id="${todo.id}"/>

              <a class="item" onclick='EditTodo(${todo.id})'> <img src="assets/img/pencil_black.png"></a>

              <a class="item" onclick='DeleteTodo(${todo.id})'><img src="assets/img/bin.png"></a>
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

listBox.addEventListener("click", (e) => {
  const hasClass = e.target.classList.contains("tick");
  console.log(hasClass);
  if (hasClass) {
    const itemKey = e.target.id;
    console.log(itemKey);
    toogleDone(itemKey);
  }
});

const toogleDone = (key) => {
  const index = todoList.findIndex((todo) => todo.id === Number(key));
  console.log(index);
  todoList[index].checked = !todoList[index].checked;
  localStorage.setItem("todosList", JSON.stringify(todoList));
  displayTodos();
};

const DeleteTodo = (index) => {
  console.log("start delete");
  //let todo = localStorage.getItem("todosList");
  //todoList = JSON.parse(todo);
  todoList.splice(
    todoList.find((todo) => todo.id == index),
    1
  );
  localStorage.setItem("todosList", JSON.stringify(todoList));
  text.value = "";
  displayTodos();
};

const EditTodo = (id) => {
  console.log(todoList);
  const queryTodo = todoList.find((todo) => {
    return todo.id == id;
  });
  console.log(queryTodo.item);
  text.value = queryTodo.item;
  saveInd = queryTodo.id;
};

displayTodos();
