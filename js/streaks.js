function getDoneTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks.filter(task => task.done);
}

function getDateKey(dateStr) {
  return new Date(dateStr).toISOString().split("T")[0];
}

function getStreaks(doneTasks) {
  const dates = doneTasks.map(t => getDateKey(t.date));
  const uniqueDates = [...new Set(dates)].sort().reverse();
  let streak = 0;
  let current = new Date();

  for (let i = 0; i < uniqueDates.length; i++) {
    const key = getDateKey(current);
    if (uniqueDates.includes(key)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else break;
  }

  return { streak, days: uniqueDates };
}

function renderStreaks() {
  const doneTasks = getDoneTasks();
  const { streak, days } = getStreaks(doneTasks);
  document.getElementById("streakDisplay").innerHTML = `🔥 Current Streak: <span class="text-orange-500">${streak} day(s)</span>`;
  const list = document.getElementById("dayList");
  list.innerHTML = "";
  days.slice(0, 30).forEach(date => {
    const li = document.createElement("li");
    li.className = "bg-gray-200 dark:bg-gray-700 p-2 rounded";
    li.innerText = `✔ Completed on ${date}`;
    list.appendChild(li);
  });
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function applySavedTheme() {
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
}

applySavedTheme();
renderStreaks();
