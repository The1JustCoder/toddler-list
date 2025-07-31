function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function applySavedTheme() {
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
}

function countTasksByDate() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const map = {};
  tasks.forEach(t => {
    if (t.done) {
      const date = t.date.split("T")[0];
      map[date] = (map[date] || 0) + 1;
    }
  });

  const dates = Object.keys(map).sort();
  return { labels: dates, data: dates.map(d => map[d]) };
}

function renderChart() {
  const { labels, data } = countTasksByDate();
  new Chart(document.getElementById("taskChart"), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: "Tasks Completed",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 5
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

applySavedTheme();
renderChart();
