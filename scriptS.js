document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.querySelector(".btn");
  const sortByTimeBtn = document.querySelector(".btnSortByTime");
  const sortByNameBtn = document.querySelector(".btnSortByTitle");
  const taskList = document.querySelector(".list");
  let ascendingOrderTime = false; // Змінна для збереження напряму сортування за часом
  let ascendingOrderName = true; // Змінна для збереження напряму сортування за назвою
  let asc = true

  // Функція для додавання нової задачі
  function addTask() {
    const taskText = document.querySelector('.inputTask').value.trim();
    const titleText = document.querySelector('.inputTitle').value.trim();
    if (taskText !== '' && titleText !== '') {
      const taskItem = document.createElement('li');
      const dateCreated = new Date().toLocaleString();
      taskItem.innerHTML = `<strong>${titleText}:</strong> <p>${taskText}</p> <span class="date">${dateCreated}</span> 
                           <button class="edit_btn">Edit</button>
                           <button class="delete_btn">Delete</button>`;
      taskItem.setAttribute('data-createdAt', Date.now()); // Додаємо атрибут з поточним часом
      taskList.appendChild(taskItem);
      document.querySelector('.inputTask').value = '';
      document.querySelector('.inputTitle').value = '';
      saveTasks();
    } else {
      alert('Please enter both a title and a task!');
    }
  }

  // Функція для редагування задачі
  function editTask(taskItem) {
    console.log('taskItem', taskItem)
    const titleElement = taskItem.querySelector('strong').textContent;
    const task = taskItem.querySelector('p').textContent;
    const newTitle = prompt('Enter new title:', titleElement);
    const newTask = prompt('Enter new task:', task);
    taskItem.querySelector('strong').textContent = newTitle;
    taskItem.querySelector('p').textContent = newTask;
    taskItem.querySelector('span.date').textContent = new Date().toLocaleString();
    taskItem.classList.add('edited');
    saveTasks();
  }

  // Функція для видалення задачі
  function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks();
  }

  // Функція для збереження задач у localStorage
  function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
  }

  // обробники подій
  addTaskBtn.addEventListener('click', addTask);
  sortByTimeBtn.addEventListener('click', sortByTime);
  sortByNameBtn.addEventListener('click', sortByName);

  taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete_btn')) {
      deleteTask(e.target.parentElement);
    } else if (e.target.classList.contains('edit_btn')) {
      editTask(e.target.parentElement);
    }
  });

  // Завантаження збережених задач після завантаження сторінки
  function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      taskList.innerHTML = tasks;
    }
  }
  loadTasks();

  // Функція для сортування за часом
  function sortByTime() {
    const tasks = Array.from(taskList.children);
    const sortedList = tasks.sort((a, b) => {
      if (asc) {
        return Number(a.dataset.createdat) - Number(b.dataset.createdat);
      } else {
        return Number(b.dataset.createdat) - Number(a.dataset.createdat)
      }
    });
    sortedList.forEach(task => taskList.appendChild(task));
    asc = !asc
  }

  // Функція для сортування за назвою
  function sortByName() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const titleA = a.querySelector('strong').textContent.toLowerCase();
      const titleB = b.querySelector('strong').textContent.toLowerCase();
      if (ascendingOrderName) {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    ascendingOrderName = !ascendingOrderName;
  }
});