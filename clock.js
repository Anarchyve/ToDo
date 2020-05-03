
const clockContainer=document.querySelector(".js-clock"),
  clockTitle=clockContainer.querySelector("h1");

function timeSet() {
  const date = new Date(),
    minutes = date.getMinutes(),
    hours = date.getHours(),
    seconds = date.getSeconds();
    clockTitle.innerText=`${
      hours<10 ? `0${hours}`:hours}:${
        minutes<10 ? `0${minutes}`:minutes
      }`;
}

function init(){
  timeSet();
  setInterval(timeSet,999)
}

init();
