//selector 
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

// ADD EVENT LISTENER OF ON CLICK TO THE todoButton
todoButton.addEventListener("click", addTodo)
// ADD EVENT LISTENER OF ON CLICK TO THE trashButton
todoList.addEventListener('click', deleteCheck)


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

