const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  jsToDoForm =document.querySelector(".js-toDoForm");

const USER_LS = "currentUser",
  SHOWING_CL= "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);

}

function askForName(){
  form.classList.add(SHOWING_CL);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CL)
  greeting.classList.add(SHOWING_CL)
  jsToDoForm.classList.add(SHOWING_CL)
  greeting.innerHTML = `Hello ${text} <br> <br>So... What are you up to today?`

}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
      askForName();
    } else {
      paintGreeting(currentUser);
    }
  }

function init() {
  loadName();
}

init();
