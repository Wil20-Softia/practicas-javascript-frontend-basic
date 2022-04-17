const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const giveaways = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items =  document.querySelectorAll(".deadline-format h4");

//Control de los dias desde el dia actual
const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();

let futureDate = new Date(tempYear, tempMonth + 1, tempDay + 2, 10, 25, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaways.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

//tiempo futuro en milisegundos
const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime - today;
  //1s = 1000ms
  //1m = 60s
  //1hr = 60min
  //1d = 24hr

  //valores en ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  //Calculo de todos los valores
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mins = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  const values = [days, hours, mins, seconds];

  function format(item){
    if(item < 10){
      return `0${item}`;
    }
    return item;
  }

  items.forEach(function(item,index){
    item.innerHTML = format(values[index]);
  });

  if(t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class='expired'>Lo siento, regalo a expirado</h4>`
  }
}

//cuenta regresiva
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();