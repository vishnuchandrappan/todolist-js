const request = new XMLHttpRequest();
let todos = {};
let data = [];
let lastID = null;
const todoList = document.querySelector(".todos");

request.onload = function(data) {
  if (request.status >= 200 && request.status < 300) {
    data = JSON.parse(data.target.response);
  }

  for (let i = 0; i < 3; i++) {
    todos.push(data[i]);
  }
  lastID = data[3].id;

  display();
};

request.open("GET", "https://jsonplaceholder.typicode.com/todos");
request.send();


// Adding New Todo

const btn = document.getElementById("add-todo");
const todo = document.getElementById("new-todo");
const alert = document.querySelector(".alert");

btn.addEventListener("click", () => {
  if (todo.value) {
    let values = todo.value.split(",");
    values.forEach(value => {
      if (value.trim()) {
        let obj = {
          userId: 1,
          id: lastID++,
          title: value.trim(),
          completed: false
        };
        todos[obj.id] = obj;
        todo.value = "";
        addToList(obj);
      }
    });
  } else {
    alertMessage("Todo Cannot be empty");
  }
});

// function to display the available todos

function display() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    addToList(todo);
  });
}

function addToList(obj) {
  let el = document.createElement("div");
  el.classList.add("todo");
  el.id = obj.id;
  let button = document.createElement("button");
  button.id = "btn-" + obj.id;
  button.innerText = "X";
  addButtonEvent(button);
  el.appendChild(button);
  let title = document.createElement("span");
  title.innerText = obj.title;
  if (obj.completed) {
    title.classList.add("completed");
  }
  addCompletedEvent(title);
  el.appendChild(title);
  todoList.appendChild(el);
}

function addButtonEvent(button) {
  button.addEventListener("click", () => {
    todos[button.parentElement.id] = {};
    button.parentElement.style.animation = "deleteAnim 1s ease";
    setTimeout(() => {
      button.parentElement.remove();
    }, 800);
    alertMessage("Todo Deleted");
  });
}

function addCompletedEvent(todo) {
  todo.addEventListener("click", () => {
    todo.classList.toggle("completed");
    todos[todo.parentElement.id].completed == false
      ? (todos[todo.parentElement.id].completed = true)
      : (todos[todo.parentElement.id].completed = false);
  });
}

function alertMessage(message){
  alert.innerText = message;
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
}
