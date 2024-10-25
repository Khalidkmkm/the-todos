import { Task } from "./Task";
import { defaultTasks } from "./defaultTasks";
import "./style.css";

const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;
const clearAllButton = document.getElementById('clearAllTask') as HTMLButtonElement;

let tasks: Task [] = loadTasksFromLocalStorage();
if (tasks.length === 0) {
  tasks = defaultTasks.map ( tasks => new Task (tasks));
}
createTaskHtml(tasks);

taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Förhindrar att sidan laddas om
  const taskDescription = (document.getElementById('taskInput') as HTMLInputElement).value;

  if (taskDescription) {
    tasks.push(new Task(taskDescription)); // Lägg till ny uppgift
    createTaskHtml(tasks); // Uppdatera uppgiftslistan i UI
    saveTasksToLocalStorage(); // Spara uppgifter till localStorage :)
    (document.getElementById('taskInput') as HTMLInputElement).value = ''; // Töm inmatningsfältet
  }
});

clearAllButton.addEventListener('click', () => {
  tasks = [];
  createTaskHtml(tasks); // Rensa listan
  saveTasksToLocalStorage(); // Rensa localStorage
});

function createTaskHtml(tasks: Task[]): void {
  taskList.innerHTML = ''; // Rensa befintlig lista

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement('li');
    li.innerText = task.description;

    li.onclick = () => {
      li.classList.toggle('completed'); // Den lägger till  samt tar bort linhjen genom texten 
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => {
      tasks.splice(i, 1); //  Den tarbort uppgiften
      createTaskHtml(tasks); // Uppdatera listan
      saveTasksToLocalStorage(); // Uppdatera localStorage
    };

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = () => {
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = task.description; // Fyller i nuvarande uppgiftsbeskrivning

      const saveButton = document.createElement('button');
      saveButton.innerText = 'Save';
      saveButton.onclick = () => {
        const updatedDescription = inputField.value;
        if (updatedDescription) {
          tasks[i].description = updatedDescription; // Uppdatera uppgiften
          createTaskHtml(tasks); // Uppdatera listan
          saveTasksToLocalStorage(); // Uppdatera localStorage
        }
      };

      li.innerHTML = ''; 
      li.appendChild(inputField);
      li.appendChild(saveButton);
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  }
}

// Sparar uppgifter i localStorage
function saveTasksToLocalStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Laddar uppgifter från localStorage
function loadTasksFromLocalStorage(): Task[] {
  const tasksFromStorage = localStorage.getItem('tasks');
  return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
}



