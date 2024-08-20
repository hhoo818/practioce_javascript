const template = document.createElement("template");
template.innerHTML = `\
<style>
  .completed {
    text-decoration: line-through;
  }
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.todoInput = this.shadowRoot.querySelector("#new-todo");
    this.todoList = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTodo();
    });
  }

  addTodo() {
    const todoText = this.todoInput.value.trim();
    if (todoText) {
      const li = document.createElement("li");
      li.textContent = todoText;

      // 完了ボタンの作成
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", () => {
        li.classList.toggle("completed");
      });

      // 削除ボタンの作成
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        this.todoList.removeChild(li);
      });

      li.appendChild(completeButton);
      li.appendChild(deleteButton);
      this.todoList.appendChild(li);

      // 入力フィールドをクリア
      this.todoInput.value = "";
    }
  }
}

customElements.define("todo-app", TodoApp);
