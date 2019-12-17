const request = new XMLHttpRequest();
let todos = ["list item 1", "list item 2", "list item 3", "list item 4"];
const todoList = document.querySelector("ul");

request.onload = function(data) {

  if (request.status >= 200 && request.status < 300) {
    todos = JSON.parse(data.target.response);
  } else {
    console.log("Request Failed");
  }

  for (let i = 0; i < 6; i++) {
    let el = document.createElement("li");
    el.innerText = todos[i].title;
    todoList.appendChild(el);
  }

};

request.open("GET", "https://jsonplaceholder.typicode.com/todos");
request.send();
