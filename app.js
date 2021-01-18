// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners

if( document.readyState !== 'loading' ) {
    getTodos();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        getTodos();
    });
}
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions

function addTodo(event){
    event.preventDefault();         //Prevent form from submitting

    if(todoInput.value === "") {
        console.log("The input is empty");
    }
    else {

        if(duplicateTodoCheck(todoInput.value) != "duplicate") {

            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            const newTodo = document.createElement("li");
            newTodo.innerText = todoInput.value;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            saveLocalTodos(todoInput.value);

            const completedButton = document.createElement("button");
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("completed-btn")
            todoDiv.appendChild(completedButton);

            const deletedButton = document.createElement("button");
            deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
            deletedButton.classList.add("deleted-btn")
            todoDiv.appendChild(deletedButton);

            todoList.appendChild(todoDiv);
            todoInput.value = "";

        }

    }

}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === "deleted-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    if(item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        markCompleted(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    })

}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let data = {
        todo: todo,
        status: "uncompleted"
    };
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo["todo"];
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn")
        todoDiv.appendChild(completedButton);

        const deletedButton = document.createElement("button");
        deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
        deletedButton.classList.add("deleted-btn")
        todoDiv.appendChild(deletedButton);

        todoList.appendChild(todoDiv);
        let status = todo.status;
        if(status === "completed") {
            todoDiv.classList.toggle("completed");
            console.log(status);
        }
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    let index = todos.findIndex(obj => obj.todo==todoIndex);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function duplicateTodoCheck(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    for (var i = 0; i < todos.length; i++){
        if (todos[i]["todo"] === todo) {
            return "duplicate";
        }
    }
}

function markCompleted(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    let index = todos.findIndex(obj => obj.todo==todoIndex);
    if(todos[index].status === "uncompleted") {
        todos[index].status = "completed";
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    else {
        todos[index].status = "uncompleted";
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
