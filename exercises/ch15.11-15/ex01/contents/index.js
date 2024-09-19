const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    data.items.forEach(task => appendToDoItem(task));
  } catch (error) {
    alert(`Failed to load tasks: ${error.message}`);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();  // ページのリロードを防ぎ、JS のみで処理を行うため

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }


  input.value = "";

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const task = await response.json();
    appendToDoItem(task);
  } catch (error) {
    alert(`Failed to add task: ${error.message}`);
  }
});

function appendToDoItem(task) {

  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: toggle.checked ? "completed" : "active"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedTask = await response.json();
      label.style.textDecorationLine = updatedTask.status === "completed" ? "line-through" : "none";
    } catch (error) {
      alert(`Failed to update task: ${error.message}`);
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      elem.remove();
    } catch (error) {
      alert(`Failed to delete task: ${error.message}`);
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
  console.log(document.cookie)
}
