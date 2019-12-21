const request = new XMLHttpRequest();
let todos = {};
let data = [];
var lastID = null;
const todoList = document.querySelector(".todos");
const allowed = ["title", "completed"];

request.onload = function(data) {
  if (request.status >= 200 && request.status < 300) {
    data = JSON.parse(data.target.response);
  }

  for (let i = 0; i < 3; i++) {
    todos[++lastID] = Object.keys(data[i])
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[i][key];
        return obj;
      }, {});
  }

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

todo.addEventListener("keyup", event => {
  if (event.keyCode == 13) {
    addTodos();
  }
});

function addTodos() {
  if (todo.value) {
    let values = todo.value.split(",");
    values.forEach(value => {
      if (value.trim()) {
        let obj = {
          title: value.trim(),
          completed: false
        };
        todos[++lastID] = obj;
        todo.value = "";
        addToList(obj, lastID);
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
    addToList(todos[i], i);
  }
  isEmpty();
  setData();
}

function addToList(obj, position) {
  let el = document.createElement("div");
  el.classList.add("todo");
  el.id = position;
  let button = document.createElement("button");
  button.innerText = "✖️";
  addButtonEvent(button);
  el.appendChild(button);
  button = document.createElement("button");
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
    let input = document.createElement("input");
    input.type = "text";
    input.value = el.innerText;
    el.innerText = "";
    input.addEventListener("change", () => {
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
      todos[todo.parentElement.id].completed = true;
      alertMessage("Marked as Done");
    } else {
      todos[todo.parentElement.id].completed = false;
      alertMessage("Marked as incomplete");
    }
    setData();
  });
}

function alertMessage(message) {
  alert.innerText = message;
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
}

function isEmpty() {
  if (!Object.keys(todos).length) {
    alertMessage("😃 Add your first todo");
  }
}

function setData() {
  if (Object.keys(todos).length === 0) {
    localStorage.clear();
  } else {
    localStorage.myTodoListData = JSON.stringify(todos);
  }
}

const hintContainer = document.querySelector(".hint-container");
const hintBtn = document.getElementById("hint-button");
const hint = document.querySelector(".hint");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const closeBtn = document.getElementById("close-button");

if (localStorage.myTodoListData) {
  todos = JSON.parse(localStorage.myTodoListData);
  display();
} else {
  request.send();
  hintContainer.style.animation = "bodyAnim 0.4s";
  setTimeout(() => {
    hintContainer.style.display = "flex";
  }, 400);
}

const greeting =
  "Hello World 😃,<br>seems like you're using todo for the first time <br><br>Let's kickstart with a simple tutorial";
const hints = [
  "Add your todos with  text box <input disabled/> and <button> ADD </button> button",
  `Add more than one todo separated by commas <input disabled value='foo, bar, baz...'/>`,
  `Click on each todo for marking it as <span>done</span> & one more click can mark it as <span>not done</span>`,
  `Hover on each todo for <button disabled>edit</button> and <button disabled>delete</button> buttons`,
  `After editing click anywhere out side the text box to save <div><input disabled value ='Edited Todo'/></div>`,
  `We'he provided some sample todos for you to get familiarized`,
  `That's it ! Enjoy... ❤️ <br> View these anytime by clicking <span>ℹ</span> at the top-right corner`
];
var currentHint = null;

hint.innerHTML = greeting;
nextBtn.addEventListener("click", () => {
  if (currentHint == null) {
    currentHint = 0;
    previousBtn.disabled = true;
  } else {
    currentHint++;
    manageButtons();
  }
  setHint();
});

previousBtn.addEventListener("click", () => {
  if (currentHint != 0) {
    currentHint--;
    manageButtons();
  }
  setHint();
});

function manageButtons() {
  closeBtn.style.animation = "";
  if (currentHint == 0) {
    previousBtn.disabled = true;
  } else {
    previousBtn.disabled = false;
  }
  if (currentHint == hints.length - 1) {
    nextBtn.disabled = true;
    closeBtn.style.animation = "pulseAnim 1s infinite alternate";
  } else {
    nextBtn.disabled = false;
  }
}

function setHint() {
  hint.style.animation = "hintAnim 0.5s ease";
  setTimeout(() => {
    hint.innerHTML =
      currentHint + 1 + " / " + hints.length + "<br>" + hints[currentHint];
  }, 200);
  setTimeout(() => {
    hint.style.animation = "";
  }, 500);
}

closeBtn.addEventListener("click", () => {
  hintContainer.style.animation = "bodyAnim 0.4s reverse";
  setTimeout(() => {
    hintContainer.style.display = "none";
  }, 400);
});

hintBtn.addEventListener("click", () => {
  hintContainer.style.animation = "bodyAnim 0.4s";
  setTimeout(() => {
    hintContainer.style.display = "flex";
  }, 400);
});
