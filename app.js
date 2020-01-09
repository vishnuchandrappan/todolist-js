const todoBtn = document.getElementById("new-todo-btn");
const todoInput = document.getElementById("new-todo-field");
const alertContainer = document.querySelector(".alert-container");
const todosContainer = document.getElementById("todos");

let todos = {};

// to get unique Id for new todo
function getUniqueId(){
  return Math.random().toString(36).substr(2, 5);
}
// adding new todo
todoBtn.addEventListener("click", () => {
  // input validation
  if (!todoInput.value) {
    alert("danger", "Todo cannot be empty");
  }


  let todoValues = todoInput.value.split(","); // getting comma separated todo values

  todoValues.forEach(todoValue => {
    if (todoValue.trim()) {
      todos[getUniqueId()] = {
        title: todoValue,
        completed: false
      };
      alert("success", "Todo Added");
    }
  });

  todoInput.value = "";
  render();
});

// inserting to dom
render = () => {
  todosContainer.innerHTML = "";
  for (const key in todos) {
    let el = document.createElement("div"); // new todo div
    el.classList.add("todo");
    el.id = key;

    let child = document.createElement("input"); // checkbox for todo
    child.type = "checkbox";
    if (todos[key].completed) {
      child.checked = true;
    }
    toggleTodo(child);
    el.appendChild(child);

    child = document.createElement("span"); // span for todo title
    child.innerText = todos[key].title;
    child.classList.add("content");
    child.contentEditable = false;
    if (todos[key].completed) {
      child.classList.add("completed");
    }
    el.appendChild(child);

    child = document.createElement("button"); // delete button
    child.innerText = "✖️";
    child.classList.add("delete");
    deleteTodo(child);
    el.appendChild(child);

    child = document.createElement("button"); // edit button
    child.innerText = "🖍";
    child.classList.add("edit");
    editTodo(child);
    el.appendChild(child);

    todosContainer.appendChild(el); //adding todo to dom
  }

  saveToLocalStorage();
};

// custom alert messages
alert = (type, message) => {
  let el = document.createElement("div"); //div for alert
  el.classList.add("alert"); // classes for div
  el.classList.add(type);
  el.innerText = message; // message text

  alertContainer.appendChild(el); // adding alert to dom

  // removing alert from container
  setTimeout(() => {
    alertContainer.removeChild(el);
  }, 3000);
};

// saving todos to localStorage
saveToLocalStorage = () => {
  localStorage.todoListData = JSON.stringify(todos);
};

// toggle button event
toggleTodo = el => {
  el.addEventListener("click", () => {
    todos[el.parentElement.id].completed = !todos[el.parentElement.id]
      .completed;
    render();
    alert(
      "success",
      todos[el.parentElement.id].completed ? "Marked as done" : "Marked as todo"
    );
  });
};

// delete todo
deleteTodo = el => {
  el.addEventListener("click", () => {
    if (confirm("You sure ?")) {
      delete todos[el.parentElement.id];
      render();
      alert("success", "Todo deleted");
    } else {
      alert("danger", "Todo not deleted");
    }
  });
};

// edit todo
editTodo = el => {
  el.addEventListener("click", () => {
    let todo = el.parentElement.children[1];

    if (todo.contentEditable == "false") {
      todo.contentEditable = true;
      todo.addEventListener("keydown", e => {
        // preventing multi line input
        if (e.key === "Enter") {
          el.click();
        }
      });
    } else {
      todo.contentEditable = false;
      todos[el.parentElement.id].title = todo.innerText;
      render();
    }

    el.innerText = el.innerText == "🖍" ? "✔️" : "🖍";
  });
};

// fetch data from JSON place holder
fetchData = () => {
  const request = new XMLHttpRequest();
  const allowed = ["title", "completed"];
  let data = [];

  request.open("GET", "https://jsonplaceholder.typicode.com/todos?_limit=5");
  request.send();

  request.onload = resp => {
    if (request.status >= 200 && request.status < 300) {
      data = JSON.parse(resp.target.response);
    }

    data.forEach(todo => {
      todos[todo.id] = Object.keys(todo)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = todo[key];
          return obj;
        }, {});
    });

    render();
  };
};

// fetching data  from local storage
function ifTodoExists() {
  if (localStorage.hasOwnProperty("todoListData")) {
    todos = JSON.parse(localStorage.todoListData);
    render();
  } else {
    fetchData();
  }
}

ifTodoExists();
