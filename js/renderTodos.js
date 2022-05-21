const renderTodo = (todo) => {
  const setTodoHtml = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick kl-tick"></label>
    <span>${todo.text}></span>
    
    <button class="delete-todo kl-delete-todo">
        X
    </button>
    `;

  const list = document.querySelector("kl-todo-list");

  const isChecked = todo.checked ? "done" : "";

  const node = document.createElement("li");

  node.setAttribute("class", `kl-todo-item ${isChecked}`);

  node.setAttribute("data-key", todo.id);

  node.innerHTML = setTodoHtml;

  list.append(node);
};

// remember: one per file
export default renderTodo;
