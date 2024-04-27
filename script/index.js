// item object structure:
// {
//   id: String,
//   text: String,
//   isDone: Boolean,
// }
let todoItems = []

let todoInput = document.getElementById("todoInput")
let todoList = document.getElementById("todoList")
let clearBtn = document.getElementById("clearBtn")

// Setup
todoInput.addEventListener("keyup", handleAdd)
clearBtn.addEventListener("click", handleClear)

// Event Handlers
function handleAdd(event){
  if(event.key === "Enter"){
    event.preventDefault()
    setItemAdd(event.srcElement.value)
    todoInput.value = ""
    render()
  }
}

function handleSetDone(event){
  const itemId = event.srcElement.parentElement.id
  setItemToggleDone(itemId)
  render()
}

function handleDelete(event){
  const itemId = event.srcElement.parentElement.id
  setItemDelete(itemId)
  render()
}

function handleClear(event){
  setItemClearDone()
  render()
}

// Data manipulation
function setItemAdd(text){
  todoItems.push({
    id: genId(),
    text: text,
    isDone: false,
  })
}

function setItemToggleDone(id){
  const index = todoItems.findIndex((item) => item.id === id)
  if(index > -1){
    todoItems[index].isDone = !todoItems[index].isDone
  }
}

function setItemDelete(id){
  const index = todoItems.findIndex((item) => item.id === id)
  if(index > -1){
    todoItems.splice(index, 1)
  }
}

function setItemClearDone(){
  todoItems = todoItems.filter((item) => !item.isDone)
}

// Utils
function render(){
  todoList.innerHTML = ""
  todoItems.forEach((item) => {
      todoList.appendChild(createItemElement(item.id, item.text, item.isDone))
    }
  )
}

function createItemElement(id, text, isDone){
  const todoListItem = document.createElement("div");
  todoListItem.setAttribute("id", id)
  todoListItem.classList.add("todo-list-item");

  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.addEventListener("change", handleSetDone)
  
  const itemText = document.createElement("span");
  itemText.classList.add("todo-list-item-text", "margin-h-1");
  itemText.textContent = text;

  const delBtn = document.createElement("button")
  delBtn.innerHTML = "x"
  delBtn.addEventListener("click", handleDelete)

  if(isDone){
    checkboxInput.setAttribute("checked", "");
    todoListItem.classList.add("item-done");
  }

  // Append the input and span elements to the main div
  todoListItem.appendChild(checkboxInput);
  todoListItem.appendChild(itemText);
  todoListItem.appendChild(delBtn);

  return todoListItem
}

function genId() {
    return "xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        return r.toString(16);
    });
}