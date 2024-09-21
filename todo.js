(function() {
  const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    resetBtn = document.querySelector(".js-reset"); // Reset 버튼 선택자 추가

  const TODOS_LS = 'toDos',
    DID_LS = "did";
  let toDos = [];

  // Reset 버튼 클릭 이벤트 처리 함수
  function handleToDoReset() {
    // localStorage에서 ToDo 리스트 삭제
    localStorage.removeItem(TODOS_LS);

    // ToDo 배열 초기화
    toDos = [];

    // 화면에서 모든 ToDo 아이템 제거
    while (toDoList.firstChild) {
      toDoList.removeChild(toDoList.firstChild);
    }
  }

  function makeItDid(event) {
    const btn = event.target;
    const li = btn.parentElement;
    li.classList.add(DID_LS);
  }

  function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentElement;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  }

  function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function paintToDo(text) {
    const li = document.createElement("li");
    const didBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "DONE";
    didBtn.innerHTML = "did";
    delBtn.addEventListener("click", deleteToDo);
    didBtn.addEventListener("click", makeItDid);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(didBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    li.classList.add("toDoItem");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
  }

  function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(todo) {
        paintToDo(todo.text);
      });
    }
  }

  function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    resetBtn.addEventListener("click", handleToDoReset); // Reset 버튼 이벤트 리스너 추가
  }

  init();
})();
