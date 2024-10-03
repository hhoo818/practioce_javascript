const dbName = "todoApp";
const storeName = "todos";
let db;

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// IndexedDB のセットアップ
function openDb() {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("todo", "todo", { unique: false });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    loadTodos(); // ページ読み込み時にデータを読み込む
  };

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };
}

openDb();

// ToDo を IndexedDB に保存
function saveTodo(todo) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  objectStore.add({ todo });

  transaction.oncomplete = () => {
    console.log("ToDo saved to IndexedDB.");
  };

  transaction.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };
}

// IndexedDB から ToDo を読み込む
function loadTodos() {
  const transaction = db.transaction([storeName]);
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const todos = event.target.result;
    todos.forEach(({ id, todo }) => {
      addTodoToList(id, todo);
    });
  };

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };
}

// ToDo リストに ToDo を追加
function addTodoToList(id, todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      label.style.textDecorationLine = "line-through";
    } else {
      label.style.textDecorationLine = "none";
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
    deleteTodoFromDb(id);
    channel.postMessage({ type: "delete", id }); // 他タブへの通知
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  elem.dataset.id = id; // ID を保存
  list.prepend(elem);
}

// IndexedDB から ToDo を削除
function deleteTodoFromDb(id) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  objectStore.delete(id);

  transaction.oncomplete = () => {
    console.log("ToDo deleted from IndexedDB.");
  };

  transaction.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };
}

// BroadcastChannel を使ったタブ間同期
const channel = new BroadcastChannel("todo_channel");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    return;
  }

  const todo = input.value.trim();
  input.value = "";

  saveTodo(todo); // IndexedDB に保存
  addTodoToList(null, todo); // リストに追加 (ID は null)

  channel.postMessage({ type: "add", todo }); // 他タブへの通知
});

channel.onmessage = (event) => {
  if (event.data.type === "add") {
    addTodoToList(null, event.data.todo);
  } else if (event.data.type === "delete") {
    const elem = list.querySelector(`li[data-id="${event.data.id}"]`);
    if (elem) {
      deleteTodoFromDb(event.data.id)
      list.removeChild(elem);
      
    }
  }
};