const hint = document.querySelector(".hint");
const hintContainer = document.querySelector(".hint-container");
const info = document.querySelector(".info");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");

var currentHint = null;

// toggle button for hints
info.addEventListener("click", () => {
  hintContainer.classList.toggle("hints-active");
  if (info.innerText === "i") {
    info.innerText = "x";
    document.querySelector(".container").style.height = "10vh";
  } else {
    info.innerText = "i";
    document.querySelector(".container").style.height = "100%";
  }
});

const greeting =
  "Hello World 😃,<br>seems like you're using todo for the first time <br><br>Let's kickstart with a simple tutorial";

// setting initial value
if (localStorage.hasOwnProperty("todoListData")) {
  currentHint = 0;
  previousBtn.disabled = true;
  setHint();
} else {
  hint.innerHTML = greeting;
  info.click();
}

// array with each hint value
const hints = [
  "Add your todos with  text box <input disabled/> & press <button> Add Todos </button>",
  `Add more than one todo separated by commas <input disabled value='foo, bar, baz...'/>`,
  `Use checkbox <input type="checkbox" readonly/> for marking todos as done / not done`,
  `Use <div> <button>🖍</button> & <button>✖️</button> </div> buttons for editing and deleting todos`,
  `We've provided some sample todos for you to get familiarized, try editing & deleting those`,
  `That's it ! Enjoy... ❤️ <br> View these anytime by clicking <div class="info">i</div> at the top-right corner`
];

// next button event
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

// previous button event
previousBtn.addEventListener("click", () => {
  if (currentHint != 0) {
    currentHint--;
    manageButtons();
  }
  setHint();
});

// disable next and previous button if needed
function manageButtons() {
  info.style.animation = "";
  if (currentHint == 0) {
    previousBtn.disabled = true;
  } else {
    previousBtn.disabled = false;
  }
  if (currentHint == hints.length - 1) {
    nextBtn.disabled = true;
    info.style.animation = "pulseAnim 1s infinite alternate";
  } else {
    nextBtn.disabled = false;
  }
}

// adding the hint to dom
function setHint() {
  hint.style.animation = "hintAnim 0.5s ease";
  setTimeout(() => {
    hint.innerHTML =
      currentHint + 1 + " / " + hints.length + "<br><br>" + hints[currentHint];
  }, 200);
  setTimeout(() => {
    hint.style.animation = "";
  }, 500);
}

var checkbox = document.getElementById("checkbox");
var doc = document.documentElement;

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    doc.setAttribute("data-theme", "dark");
    localStorage.theme = "dark";
  } else {
    doc.setAttribute("data-theme", "light");
    localStorage.theme = "light";
  }
});

if(localStorage.hasOwnProperty("theme")) {
    doc.setAttribute("data-theme", localStorage.theme);
}
