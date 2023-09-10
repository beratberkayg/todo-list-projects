const input = document.getElementById("input");
const button = document.getElementById("button");
const items = document.querySelector(".text-container");

document.addEventListener("DOMContentLoaded", loadAllTodosToUI); // sayfa yenilenince yüklenir

function loadAllTodosToUI() {
  // sayfa yüklenince todoları ekrana gönderecek
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

function getTodosFromStorage() {
  // todos array imizi tanımlıyoruz ve hep güncelliyoruz
  // storageden todoları alır
  let todos;
  if (localStorage.getItem("todos") === null) {
    // local boşsa boş dizi dönecek
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // local doluysa dolu dönecek
  }
  return todos;
}

button.addEventListener("click", () => {
  // butona tıklandığında inputun içini kontrol ederek arayüze eklemek için gönderen fonsksiyon
  let newTodo = input.value.trim();
  if (newTodo != "") {
    addTodoUI(newTodo);
    addTodoToStorage(newTodo);
    input.value = "";
  } else {
    alert("lütfen metin girin");
  }
});

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage(); // todos dizisini çekiyoruz
  todos.push(newTodo); // yeni todoyu todos dizisine ekler
  localStorage.setItem("todos", JSON.stringify(todos)); // arrayleri string yaparak güncelleriz.
}

function addTodoUI(newTodo) {
  // arayüze ekleyen fonsksiyon
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.textContent = newTodo;
  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-xmark");

  i.addEventListener("click", deleteTodo);

  li.addEventListener("click", () => {
    li.classList.toggle("checked");
  });

  items.appendChild(ul);
  ul.appendChild(li);
  ul.appendChild(i);
}

function deleteTodo(e) {
  // arayüzden todoyu silme
  if ((e.target.className === "fa-solid", "fa-xmark")) {
    e.target.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.textContent);
  }
}

function deleteTodoFromStorage(deleteTodo) {
  // storageden todoyu silme
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1); // array den değeri siler
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos)); // locali güncelleriz.
}
