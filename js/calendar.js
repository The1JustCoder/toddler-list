function getDoneTaskDates() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return new Set(tasks.filter(t => t.done).map(t => t.date.split("T")[0]));
}

function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const completedDates = getDoneTaskDates();

  const grid = document.getElementById("calendarGrid");
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  grid.innerHTML = weekDays.map(d => `<div class='font-bold'>${d}</div>`).join("");

  for (let i = 0; i < firstDay; i++) grid.innerHTML += "<div></div>";

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isDone = completedDates.has(dateKey);
    grid.innerHTML += `<div class="p-2 rounded ${isDone ? 'bg-green-400 dark:bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}">${day}</div>`;
  }
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function applySavedTheme() {
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
}

applySavedTheme();
renderCalendar();
