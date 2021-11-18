//selector 
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const filterOption = document.querySelector('#filter-todo') 
const todoList = document.querySelector('.todo-list')
// ADD EVENT LISTENER OF ON CLICK TO THE todoButton
todoButton.addEventListener("click", addTodo)
// ADD EVENT LISTENER OF ON CLICK TO THE trashButton
todoList.addEventListener('click', deleteCheck)
// ADD EVENT LISTENER OF ON CLICK TO THE FILTER
filterOption.addEventListener('click', filterTodo)
//
document.addEventListener('DOMContentLoaded', getTodos)
//  Creating addTodo()
function addTodo(e) {
    // prevent form from submitting
    e.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // NEW TODO
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.textContent = todoInput.value
    todoDiv.appendChild(newTodo)
    // Add todo value to localStorage
    saveTodostoLocal(todoInput.value)
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = `<i class="fas fa-check"></i>`
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    //DELETE BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    //APPEND TO LIST
    todoList.appendChild(todoDiv)
    // CLEAT todoInput value
    todoInput.value = ''
}

// Creat deleteCheck()
function deleteCheck(e) {
    const item = e.target 
    // Delete todo
    if (item.classList[0] === 'trash-btn') {
       const todo = item.parentElement
       // Animation
       todo.classList.add('fall')
       removeTodosFromLocal(todo)
       todo.addEventListener("transitionend", function(){
            todo.remove()
       })
    }

    
    //CHECK Mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}


// function of filter the Todo list
function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch (e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';   
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}
// function for save todo to localStorage
function saveTodostoLocal(todo) {
    // check if todos is empty or not
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// function
function getTodos(todo) {
    // check if todos is empty or not
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {  
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // NEW TODO
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo-item')
        newTodo.textContent = todo
        todoDiv.appendChild(newTodo)
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = `<i class="fas fa-check"></i>`
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        //DELETE BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //APPEND TO LIST
        todoList.appendChild(todoDiv)
    })
}

function removeTodosFromLocal(todo) {
    // check if todos is empty or not
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // here we first get index of todo which we wanna delete and then splice it from todos which is a array
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

