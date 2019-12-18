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

const btn = document.getElementById("add-todo");
const todo = document.getElementById("new-todo");

btn.addEventListener("click", () => {
  let obj = {
    userId : 1,
    id : lastID++,
    title : todo.value,
    completed : false
  }
  todos[obj.id]=obj;
  todo.value = "";

  addToList(obj);

});

function display(){
  todoList.innerHTML = "";
  todos.forEach( todo => {
    addToList(todo);
  });
}

function addToList(obj) {
  let el = document.createElement('div');
  el.classList.add('todo');
  el.id = obj.id;
  let button = document.createElement('button');
  button.id = "btn-"+obj.id;
  button.innerText = "X";
  addButtonEvent(button);
  el.appendChild(button);
  let title = document.createElement('span');
  title.innerText = obj.title;
  if (obj.completed) {
    title.classList.add('completed');
  }
  addCompletedEvent(title);
  el.appendChild(title);
  todoList.appendChild(el);
}

function addButtonEvent(button){
  button.addEventListener("click", () => {
    todos[button.parentElement.id] = {};
    button.parentElement.remove();
  });
}

function addCompletedEvent(todo){
  todo.addEventListener("click",() => {
    todo.classList.toggle('completed');
    todos[todo.parentElement.id].completed == false ?
    todos[todo.parentElement.id].completed = true :
    todos[todo.parentElement.id].completed = false
  });
}
