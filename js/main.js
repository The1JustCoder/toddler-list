let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg fade-in transition";
    li.innerHTML = `
      <span class="${task.done ? 'line-through text-gray-500 dark:text-gray-400' : ''}">${task.text}</span>
      <div class="flex gap-2">
        <button onclick="toggleDone(${task.id})" class="bg-green-500 hover:bg-green-600 transition text-white px-2 py-1 rounded">✔</button>
        <button onclick="deleteTask(${task.id})" class="bg-red-500 hover:bg-red-600 transition text-white px-2 py-1 rounded">✖</button>
      </div>`;
    list.appendChild(li);
  });
}


function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;
  const newTask = { id: Date.now(), text, done: false, date: new Date().toISOString().split("T")[0] };
  tasks.push(newTask);
  saveTasks();
  input.value = "";
  renderTasks();
}

function toggleDone(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// function renderTasks() {
//   const list = document.getElementById("taskList");
//   list.innerHTML = "";
//   tasks.forEach(task => {
//     const li = document.createElement("li");
//     li.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded";
//     li.innerHTML = `
//       <span class="${task.done ? 'line-through text-gray-500' : ''}">${task.text}</span>
//       <div>
//         <button onclick="toggleDone(${task.id})" class="text-green-600 px-2">✔</button>
//         <button onclick="deleteTask(${task.id})" class="text-red-600 px-2">✖</button>
//       </div>`;
//     list.appendChild(li);
//   });
// }

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function applySavedTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.documentElement.classList.add('dark');
}

applySavedTheme();
renderTasks();
