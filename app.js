const request = new XMLHttpRequest();
let todos = {};
let data = [];
var lastID = null;
const todoList = document.querySelector(".todos");

request.onload = function(data) {
  if (request.status >= 200 && request.status < 300) {
    data = JSON.parse(data.target.response);
  }

  for (let i = 0; i < 3; i++) {
    todos[data[i].id] = data[i];
  }
  lastID = data[2].id;

  display();
};

request.open("GET", "https://jsonplaceholder.typicode.com/todos");


// Adding New Todo

const btn = document.getElementById("add-todo");
const todo = document.getElementById("new-todo");
const alert = document.querySelector(".alert");

btn.addEventListener("click", () => {
  addTodos();
});

todo.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    addTodos();
  }
});

function addTodos(){
  if (todo.value) {
    let values = todo.value.split(",");
    values.forEach(value => {
      if (value.trim()) {
        let obj = {
          userId: 1,
          id: ++lastID,
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
  setData();
}

// function to display the available todos

function display() {
  todoList.innerHTML = "";
  for (let i in todos) {
    addToList(todos[i]);
  }
  isEmpty();
  setData();
}

function addToList(obj) {
  let el = document.createElement("div");
  el.classList.add("todo");
  el.id = obj.id;
  let button = document.createElement("button");
  button.id = "btn-" + obj.id;
  button.innerText = "✖️";
  addButtonEvent(button);
  el.appendChild(button);
  button = document.createElement("button");
  button.id = "editBtn-" + obj.id;
  button.innerText = "🖍";
  addEditButtonEvent(button);
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
    delete todos[button.parentElement.id];
    button.parentElement.style.animation = "deleteAnim 1s ease";
    setTimeout(() => {
      button.parentElement.remove();
    }, 800);
    alertMessage("Todo Deleted");
    isEmpty();
    setData();
  });
}

function addEditButtonEvent(button) {
  button.addEventListener("click", () => {
    let el = document.getElementById(button.parentElement.id).childNodes[2];
    let input = document.createElement('input');
    input.type = "text";
    input.value = el.innerText;
    el.innerText="";
    input.addEventListener("change" , () => {
      el.innerText = input.value;
      todos[el.parentElement.id].title = input.value;
      setData();
    });
    el.appendChild(input);
  });
}
function addCompletedEvent(todo) {
  todo.addEventListener("click", () => {
    todo.classList.toggle("completed");
    if (!todos[todo.parentElement.id].completed) {
      todos[todo.parentElement.id].completed = true
      alertMessage("Marked as Done");
    }
    else{
      todos[todo.parentElement.id].completed = false
      alertMessage("Marked as incomplete");
    }
    setData();
  });


}

function alertMessage(message){
  alert.innerText = message;
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
}

function isEmpty(){
   if (!Object.keys(todos).length) {
     alertMessage("😃 Add your first todo");
   }
}

function setData() {
  localStorage.myTodoListData = JSON.stringify(todos)
}

if(localStorage.myTodoListData) {
  todos = JSON.parse(localStorage.myTodoListData)
  display();
} else {
  request.send();
}
