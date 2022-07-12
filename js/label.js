setInterval(function () {
  const header = document.getElementById("header");
  header.innerHTML = new Date().toLocaleString();
}, 1000);

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");

const toggle = document.querySelector("#toggle");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let isDarkMode = JSON.parse(localStorage.getItem("isDark") || "false");

if (isDarkMode) {
  toggle.checked = false;
  setDark();
} else {
  toggle.checked = true;
  setLight();
}



function creating(task) {
  const task_el = document.createElement("div");
  task_el.classList.add("task");

  const task_done_el = document.createElement("label");
  task_done_el.classList.add("done-style");
  task_el.appendChild(task_done_el);

  const task_done_input_el = document.createElement("input");
  task_done_input_el.type = "checkbox";
  task_done_input_el.classList.add("label-input");
  task_done_el.appendChild(task_done_input_el);

  const task_done_span_el = document.createElement("span");
  task_done_span_el.classList.add("checkbox");
  task_done_el.appendChild(task_done_span_el);

  const task_content_el = document.createElement("div");
  task_content_el.classList.add("content");

  task_el.appendChild(task_content_el);

  const task_input_el = document.createElement("input");
  task_input_el.classList.add("text");
  task_input_el.type = "text";
  task_input_el.value = task.text;
  task_input_el.maxLength = "55";
  task_input_el.setAttribute("readonly", "readonly");

  task_content_el.appendChild(task_input_el);

  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";

  const task_delete_el = document.createElement("button");
  task_delete_el.classList.add("delete");
  task_delete_el.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  if (!task.isDone) task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);

  task_el.appendChild(task_actions_el);

  list_el.appendChild(task_el);

  id = task.id;
  let index = todos.findIndex((elem) => elem.id == id);

  task_edit_el.addEventListener("click", () => {
    if (todos[index].isEdit === false) {
      todos[index].isEdit = true;

      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
      task_edit_el.innerHTML = '<i class="fa-solid fa-check"></i>';

      localStorage.setItem("todos", JSON.stringify(todos));
    } else if (!task_input_el.value.trim()) {
      Swal.fire({
        icon: "error",
        text: "Please enter a valid Name!",
        background: "var(--icon)",
        color: "var(--red)",
        confirmButtonColor: "var(--green)",
      });
    } else {
      todos[index].isEdit = false;
      todos[index].text = task_input_el.value;
      task_input_el.setAttribute("readonly", "readonly");
      task_edit_el.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";

      Toast.fire({
        icon: "success",
        title: "Saved!",
      });

      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  task_delete_el.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      color: "var(--green)",
      showCancelButton: true,
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Delete!",
      background: "var(--icon)",
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: "success",
          title: "Deleted!",
        });
        todos.splice(index, 1);

        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      }
    });
  });

  task_done_input_el.addEventListener("click", () => {
    if (todos[index].isDone) {
      todos[index].isDone = false;
      cssChangeType1();
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      todos[index].isDone = true;
      cssChangeType2();
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    renderTodos();
  });

  todos[index].isDone ? cssChangeType2() : cssChangeType1();

  function cssChangeType2 () {
    task_done_input_el.setAttribute("checked", "checked");
    task_input_el.classList.add("checked-text");
    task_el.style.cssText = `
            background-color: var(--blue);
            transition-duration: 0.3s;
            box-shadow: 0 0 0 2px var(--green), 0 0 8px var(--green);
            `;
  }
  function cssChangeType1 () {
    task_done_input_el.removeAttribute("checked", "checked");
    task_input_el.classList.remove("checked-text");
    task_el.style.cssText = `
            background-color: var(--darkest);
            box-shadow: 0 0 0 2px var(--light), 0 0 8px var(--light);
            `;
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input.value.trim()) {
    Swal.fire({
      icon: "error",
      text: "Please enter a valid Name!",
      background: "var(--icon)",
      color: "var(--red)",
      confirmButtonColor: "var(--green)",
    });
  } else {
    todos.push({
      id: `${input.value}${Math.floor(Math.random() * 1000) + 1}`,
      text: input.value,
      isDone: false,
      isEdit: false,
    });
  }

  renderTodos();

  localStorage.setItem("todos", JSON.stringify(todos));

  txtSetCounter();
});

function nothingToDo() {
  const no_content = document.getElementById("no-tasks");
  todos.length === 0
    ? (no_content.style.display = "block")
    : (no_content.style.display = "none");
}

function renderTodos() {
  list_el.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    creating(todos[i]);
    input.value = "";
  }

  nothingToDo();
}
renderTodos();



toggle.addEventListener("click", () => {
  if (toggle.checked) {
    localStorage.setItem("isDark", "false");
    setLight();
  } else {
    localStorage.setItem("isDark", "true");
    setDark();
  }
});

function setLight() {
  document.documentElement.style.setProperty("--dark", "#c3c3c3");
  document.documentElement.style.setProperty("--icon", "#d2d2d2");
  document.documentElement.style.setProperty("--darker", "#4646464d");
  document.documentElement.style.setProperty("--darkest", "#4646464d");
  document.documentElement.style.setProperty("--green", "#9500ff");
  document.documentElement.style.setProperty("--blue", "#9500ff4d");
}

function setDark() {
  document.documentElement.style.setProperty("--dark", "#111");
  document.documentElement.style.setProperty("--icon", "#00000080");
  document.documentElement.style.setProperty("--darker", "#464748");
  document.documentElement.style.setProperty("--darkest", "#464646");
  document.documentElement.style.setProperty("--green", "#0f0");
  document.documentElement.style.setProperty("--blue", "#00ff004d");
}

const txt_item = document.querySelector(".textarea-item");
const txt_item_limit = txt_item.getAttribute("maxlength");
const txt_counter = document.querySelector(".textarea-counter span");
txt_counter.innerHTML = `${txt_item_limit}/${txt_item_limit}`;

txt_item.addEventListener("input", txtSetCounter);

function txtSetCounter() {
  const txtCounterResult = txt_item_limit - txt_item.value.length;
  txt_counter.innerHTML = `${txtCounterResult}/${txt_item_limit}`;
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  color: "var(--green)",
  background: "var(--icon)",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
