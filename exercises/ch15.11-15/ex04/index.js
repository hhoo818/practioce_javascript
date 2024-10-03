const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// データの保存と取得をローカルストレージを使って行う関数
function saveTodos(todos) {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos)
  } catch (e) {
    console.error("LocalStorage is not available.");
  }
}

function loadTodos() {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (e) {
    console.error("LocalStorage is not available.");
    return [];
  }
}

// ToDoリストの状態を更新する関数
function updateTodoList() {
  const todos = loadTodos();
  list.innerHTML = "";
  todos.forEach(({ todo, checked }) => {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = checked ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = checked;
    toggle.addEventListener("change", () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      const updatedTodos = loadTodos().map(item =>
        item.todo === todo ? { todo, checked: toggle.checked } : item
      );
      saveTodos(updatedTodos);
      broadcastUpdate();
    });

    const destroy = document.createElement("button");
    destroy.textContent = "Delete";
    destroy.addEventListener("click", () => {
      const updatedTodos = loadTodos().filter(item => item.todo !== todo);
      saveTodos(updatedTodos);
      updateTodoList();
      broadcastUpdate();
    });

    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.appendChild(elem);
  });
}

// ToDoの追加
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    return;
  }

  const todo = input.value.trim();
  input.value = "";

  const todos = loadTodos();
  todos.push({ todo, checked: false });
  saveTodos(todos);
  updateTodoList();
  broadcastUpdate();
});

// 他のタブに変更を伝えるための仕組み
function broadcastUpdate() {
  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel('todos_channel');
    channel.postMessage('update');
  }
}

const channel = new BroadcastChannel('todo_channel');
channel.onmessage = () => {
  updateTodoList();
};

updateTodoList();