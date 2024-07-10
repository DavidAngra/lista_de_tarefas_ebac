const frm = document.querySelector("form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const liItem = document.querySelector(".liItem");

let tasks = [];

frm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    adicionarTask();
    taskInput.value = "";
});

function adicionarTask() {
    tasks.push({
        text: taskInput.value,
        checked: false,
    });

    mostrarTasks();
}

function mostrarTasks() {
    let newLi = "";

    tasks.forEach((item, index) => {
        newLi += `<li class="liItem ${
            item.checked && "checked"
        }"  onclick="concluirTarefa(${index})">${
            item.text
        }<img class="closeBtn" src="img/close.png" alt="botao fechar" onclick="deletarItem(${index})"></li>`;
    });

    taskList.innerHTML = newLi;
    localStorage.setItem("lista", JSON.stringify(tasks));
}

function concluirTarefa(index) {
    tasks[index].checked = !tasks[index].checked;

    mostrarTasks();
}

function deletarItem(index) {
    tasks.splice(index, 1);
    mostrarTasks();
}

function recarregarTasks() {
    const tarefasLocalStorage = localStorage.getItem("lista");

    if (tarefasLocalStorage) {
        tasks = JSON.parse(tarefasLocalStorage);
    }

    mostrarTasks();
}

recarregarTasks();
