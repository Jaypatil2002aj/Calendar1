const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const calendarDays = document.getElementById("calendarDays");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let selectedHolidays = [];

function renderCalendar(date) {
  calendarDays.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  currentMonthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let dayOfWeek of daysOfWeek) {
    const dayElem = document.createElement("div");
    dayElem.className = "day";
    dayElem.textContent = dayOfWeek;
    calendarDays.appendChild(dayElem);
  }

  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day";
    calendarDays.appendChild(emptyDay);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayElem = document.createElement("div");
    dayElem.className = "day";
    dayElem.textContent = i;

    if (selectedHolidays.includes(i)) {
      dayElem.classList.add("active");
    }

    dayElem.addEventListener("click", () => {
      if (selectedHolidays.includes(i)) {
        const index = selectedHolidays.indexOf(i);
        selectedHolidays.splice(index, 1);
        dayElem.classList.remove("active");
      } else if (selectedHolidays.length < 5) {
        selectedHolidays.push(i);
        dayElem.classList.add("active");
      } else {
        alert(" You have reached your holiday limit.");
      }
    });

    calendarDays.appendChild(dayElem);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  selectedHolidays = [];
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  selectedHolidays =[];
  renderCalendar(currentDate);
});

renderCalendar(currentDate);

