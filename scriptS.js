document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.querySelector(".btn");
  const sortByTimeBtn = document.querySelector(".btnSortByTime");
  const sortByNameBtn = document.querySelector(".btnSortByTitle");
  const taskList = document.querySelector(".list");
  let ascendingOrderTime = false; // Змінна для збереження напряму сортування за часом
  let ascendingOrderName = true; // Змінна для збереження напряму сортування за назвою

  // Функція для додавання нової задачі
  function addTask() {
    const taskText = document.querySelector('.inputTask').value.trim();
    const titleText = document.querySelector('.inputTitle').value.trim();
    if (taskText !== '' && titleText !== '') {
      const taskItem = document.createElement('li');
      const dateCreated = new Date().toLocaleString();
      taskItem.innerHTML = `<strong>${titleText}:</strong> ${taskText} <span class="date">${dateCreated}</span> 
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
    const titleElement = taskItem.querySelector('strong');
    const title = titleElement.textContent;
    const task = taskItem.querySelector('span').textContent;
    const newTitle = prompt('Enter new title:', title);
    const newTask = prompt('Enter new task:', task);
    if (newTitle !== null && newTask !== null) {
      titleElement.textContent = newTitle;
      taskItem.querySelector('span').textContent = newTask;
      taskItem.querySelector('span.date').textContent = new Date().toLocaleString();
      taskItem.classList.add('edited');
      saveTasks();
    }
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
    tasks.sort((a, b) => {
      const timeA = new Date(a.getAttribute('data-createdAt'));
      const timeB = new Date(b.getAttribute('data-createdAt'));
      if (ascendingOrderTime) {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    });
    ascendingOrderTime = !ascendingOrderTime; // Зміна напряму сортування для наступного натискання
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
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