const request = new XMLHttpRequest();
let todos = [];
let data = [];
const todoList = document.querySelector("ul");

request.onload = function(data) {
  if (request.status >= 200 && request.status < 300) {
    data = JSON.parse(data.target.response);
  } else {
    console.log("Request Failed");
  }

  for (let i = 0; i < 3; i++) {
    todos.push(data[i].title);
  }

  display();
};

request.open("GET", "https://jsonplaceholder.typicode.com/todos");
request.send();

const btn = document.getElementById("add-todo");
const todo = document.getElementById("todo");

btn.addEventListener("click", () => {
  todos.push(todo.value);
  todo.value = "";
  display();
});

function display() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    let el = document.createElement("li");
    el.innerText = todo;
    el.classList.add("todo-item");
    todoList.appendChild(el);
  });

  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach(todoItem => {
    todoItem.addEventListener("click", () => {
      todoItem.style.textDecoration == "line-through" ?
      todoItem.style.textDecoration = "none" :
      todoItem.style.textDecoration = "line-through"
    });
  });
}
