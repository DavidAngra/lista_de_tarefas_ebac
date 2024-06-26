$(document).ready(() => {
   $("form").on("submit", (ev) => {
      ev.preventDefault();

      addNewTask();
      checkedTask();
      removeTask();
   });
});

function addNewTask() {
   const inputValue = $("#taskInput");
   const newTask = $(`<li>${inputValue.val()}</li>`);
   $(`<img class="closeBtn" src="img/close.png" alt="botao fechar">`).appendTo(
      newTask
   );

   $(newTask).appendTo("ul");
   inputValue.val("");
}

function checkedTask() {
   $("li").on("click", (ev) => {
      $(ev.target).addClass("checked");
   });
}

function removeTask() {
   $("li").on("click", ".closeBtn", (ev) => {
      $(ev.target).parent().remove();
   });
}
