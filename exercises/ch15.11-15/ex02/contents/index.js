const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    disableForm(true);
    await retryWithExponentialBackoff(
      () => fetch("/api/tasks"),
      3,
      async (success, response) => {
        if (!success || !response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        data.items.forEach((task) => appendToDoItem(task));
      }
    );
  } catch (error) {
    alert(`Failed to load tasks: ${error.message}`);
  } finally {
    disableForm(false);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // ページのリロードを防ぎ、JS のみで処理を行うため

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  try {
    disableForm(true);
    await retryWithExponentialBackoff(
      () =>
        fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: todo }),
        }),
      3,
      async (success, response) => {
        if (!success || !response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const task = await response.json();
        appendToDoItem(task);
      }
    );
  } catch (error) {
    alert(`Failed to add task: ${error.message}`);
  } finally {
    disableForm(false); // フォームを再有効化
  }
});

function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", async () => {
    disableForm(true);
    try {
      await retryWithExponentialBackoff(
        () =>
          fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: toggle.checked ? "completed" : "active",
            }),
          }),
        3,
        async (success, response) => {
          if (!success || !response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }

          const updatedTask = await response.json();
          label.style.textDecorationLine =
            updatedTask.status === "completed" ? "line-through" : "none";
        }
      );
    } catch (error) {
      alert(`Failed to update task: ${error.message}`);
    } finally {
      disableForm(false);
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";
  destroy.addEventListener("click", async () => {
    disableForm(true); // 削除ボタンを押した際に無効化
    try {
      await retryWithExponentialBackoff(
        () =>
          fetch(`/api/tasks/${task.id}`, {
            method: "DELETE",
          }),
        3,
        async (success, response) => {
          if (!success || !response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }

          elem.remove();
        }
      );
    } catch (error) {
      alert(`Failed to delete task: ${error.message}`);
    } finally {
      disableForm(false); // フォームを再有効化
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
  console.log(document.cookie);
}

// retryWithExponentialBackoff 関数の改修版
export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  async function retry() {
    disableForm(true);
    attempt++;
    try {
      const response = await func(); // func を実行して結果を受け取る
      if (response.ok || response.status < 500) {
        callback(true, response); // 正常なレスポンス、または500未満のステータスコードの場合は成功
      } else if (attempt < maxRetry && response.status >= 500) {
        setTimeout(retry, Math.pow(2, attempt - 1) * 1000);
      } else {
        callback(false, response); // リトライ回数上限到達、または500番以外のエラーの場合は失敗
      }
    } catch (error) {
      if (attempt < maxRetry) {
        setTimeout(retry, Math.pow(2, attempt - 1) * 1000);
      } else {
        callback(false, null); // リトライ回数上限到達時の失敗
      }
    } finally {
      disableForm(false); // フォームを再有効化
    }
  }

  retry();
}

// フォーム全体を無効化・有効化する関数
function disableForm(disable) {

  const form = document.getElementById("new-todo-form");
  const todoInput = document.getElementById("new-todo");
  const todoList = document.getElementById("todo-list");
  const addButton = document.getElementById("add-todo-button");
  form.disable  = disable
  todoInput.disable  = disable
  todoList.disable  = disable
  addButton.disable  = disable
  const buttons = list.querySelectorAll("button, input[type='checkbox']");
  buttons.forEach((button) => (button.disabled = disable));
}
