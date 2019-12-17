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
  todos.forEach((todo,index) => {
    let el = document.createElement("li");
    let btn = document.createElement("span");
    btn.innerText = 'X';
    btn.id = "btn-"+index;
    btn.classList.add('btn');
    el.appendChild(btn);
    title = document.createElement("span");
    title.innerHTML = todo;
    title.classList.add('title');
    el.appendChild(title);
    el.classList.add("todo-item");
    el.id=index;
    todoList.appendChild(el);
  });

  const todoItems = document.querySelectorAll(".todo-item .title");

  todoItems.forEach(todoItem => {
    todoItem.addEventListener("click", () => {
      todoItem.style.textDecoration == "line-through" ?
      todoItem.style.textDecoration = "none" :
      todoItem.style.textDecoration = "line-through"
    });
  });


  const buttons = document.querySelectorAll('.todo-item .btn');

  buttons.forEach(btn => {
    btn.addEventListener("click",() => {
        todos.splice(btn.id.slice(4,6),1);
        btn.parentElement.remove();
    });
  });
}
