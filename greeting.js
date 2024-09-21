(function() {
  const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    jsToDoForm = document.querySelector(".js-toDoForm"),
    resetBtn = document.querySelector(".js-reset"); // Reset 버튼 선택자 추가

  const USER_LS = "currentUser",
    SHOWING_CL = "showing";

  function saveName(text) {
    localStorage.setItem(USER_LS, text);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
  }

  function askForName() {
    form.classList.add(SHOWING_CL);
    form.addEventListener("submit", handleSubmit);
  }

  function paintGreeting(text) {
    form.classList.remove(SHOWING_CL);
    greeting.classList.add(SHOWING_CL);
    jsToDoForm.classList.add(SHOWING_CL);
    greeting.innerHTML = `Hello ${text} <br><br>So... What are you up to today?`;
  }

  function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
      askForName();
    } else {
      paintGreeting(currentUser);
    }
  }

  function handleReset() {
    localStorage.clear(); // localStorage의 모든 데이터 삭제

    // UI 요소들 초기화
    greeting.classList.remove(SHOWING_CL);
    jsToDoForm.classList.remove(SHOWING_CL);
    form.classList.add(SHOWING_CL);
    input.value = ""; // 입력 필드 비우기

    // 이벤트 리스너 재설정
    form.removeEventListener("submit", handleSubmit);
    form.addEventListener("submit", handleSubmit);
  }

  // Reset 버튼에 이벤트 리스너 추가
  resetBtn.addEventListener("click", handleReset);

  function init() {
    loadName();
  }

  init();
})();
