# ✅ Todo App – Skapad med TypeScript

Detta är ett projekt där jag har byggt en **interaktiv todo-lista** med hjälp av TypeScript, HTML och CSS. Användaren kan lägga till uppgifter, markera dem som färdiga och ta bort dem från listan – allt sker smidigt direkt i webbläsaren utan omladdning.

## ✨ Funktioner

- Lägg till nya uppgifter
- Markera uppgifter som slutförda
- Ta bort uppgifter från listan
- Dynamisk uppdatering med DOM-manipulation
- Stilren och användarvänlig design

## 🧰 Tekniker

- TypeScript
- HTML5
- CSS3
- Eventhantering i DOM
- Grundläggande komponentstruktur

## 💻 Kodexempel

taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Förhindrar att sidan laddas om
  const taskDescription = (document.getElementById('taskInput') as HTMLInputElement).value;

  if (taskDescription) {
    tasks.push(new Task(taskDescription));         // Lägg till ny uppgift
    createTaskHtml(tasks);                         // Uppdatera listan visuellt
    saveTasksToLocalStorage();                     // Spara uppgiften lokalt
    (document.getElementById('taskInput') as HTMLInputElement).value = '';
  }
});

