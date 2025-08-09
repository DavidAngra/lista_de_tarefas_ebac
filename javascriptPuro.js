const frm = document.querySelector("form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const toggleThemeBtn = document.querySelector("#toggleTheme");

let tasks = [];
let darkMode = false;

frm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  adicionarTask();
  taskInput.value = "";
});

function adicionarTask() {
  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value.trim(),
    checked: false,
  });

  mostrarTasks();
}

function mostrarTasks() {
  let newLi = "";

  tasks.forEach((item, index) => {
    newLi += `
      <li class="liItem ${item.checked ? "checked" : ""}">
        <img src="img/checked.png" alt="Concluir" title="Concluir tarefa" onclick="concluirTarefa(${index})" />
        <span>${item.text}</span>
        <img class="editBtn" src="img/edit.png" alt="Editar" title="Editar tarefa" onclick="editarTask(${index})" />
        <img class="closeBtn" src="img/close.png" alt="Excluir" title="Excluir tarefa" onclick="deletarItem(${index})" />
      </li>
    `;
  });

  taskList.innerHTML = newLi;
  localStorage.setItem("taskpro_lista", JSON.stringify(tasks));
}

function concluirTarefa(index) {
  tasks[index].checked = !tasks[index].checked;
  mostrarTasks();
}

function editarTask(index) {
  const novoTexto = prompt("Edite sua tarefa:", tasks[index].text);
  if (novoTexto !== null && novoTexto.trim() !== "") {
    tasks[index].text = novoTexto.trim();
    mostrarTasks();
  }
}

function deletarItem(index) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    tasks.splice(index, 1);
    mostrarTasks();
  }
}

function recarregarTasks() {
  const tarefasLocalStorage = localStorage.getItem("taskpro_lista");
  if (tarefasLocalStorage) {
    tasks = JSON.parse(tarefasLocalStorage);
  }
  mostrarTasks();
}

// Alternar tema dark/light
toggleThemeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  toggleThemeBtn.textContent = darkMode ? "☀️" : "🌙";
});

// Carrega ao abrir
recarregarTasks();
