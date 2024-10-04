let addtasktbtn = document.querySelector(".taskbtn");
let deleteallbtn = document.querySelector(".deleteallbtn");
let listcontainer = document.querySelector("#task-container");
let inputtask = document.querySelector("#input-box");
let editingTask = null;

addtasktbtn.addEventListener("click", () => {
    if (inputtask.value) {
        if (editingTask) {
            // Update existing task
            editingTask.querySelector(".inputtext").textContent = inputtask.value;
            editingTask = null;
            addtasktbtn.textContent = "Add Task";
        } else {
            // Add new task
            let task = document.createElement("li");
            task.className = "task-item";
            task.innerHTML = `
                <div class="checkbox-circle"><span class="tick-mark">&check;</span></div>
                <div class="inputtext">${inputtask.value}</div>
                <div class="btns">
                    <button class="edittaskbtn">Edit</button>
                    <button class="deletetaskbtn">Remove</button>
                </div>`;
            listcontainer.appendChild(task);
        }
        inputtask.value = '';
        storeData();
    } else {
        alert("Add a task");
    }
});

deleteallbtn.addEventListener("click", () => {
    listcontainer.innerHTML = '';
    storeData();
});

listcontainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("deletetaskbtn")) {
        e.target.closest("li").remove();
        inputtask.value=''
        storeData();
    } else if (e.target.classList.contains("edittaskbtn")) {
        editingTask = e.target.closest("li");
        inputtask.value = editingTask.querySelector(".inputtext").textContent;
        addtasktbtn.textContent = "Edit Task";
    } else if (e.target.closest("li")) {
        let taskItem = e.target.closest("li");
        taskItem.querySelector(".checkbox-circle").classList.toggle("checked");
        taskItem.querySelector(".tick-mark").classList.toggle("checked");
        taskItem.querySelector(".inputtext").classList.toggle("line");
        storeData();
    }
});
/* listcontainer.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        const label = e.target.nextElementSibling; // Get the associated label
        label.style.textDecoration = e.target.checked ? "line-through" : "none";
        storeData(); // Update localStorage on state change
    }
}); */

/* to store in localstorage */
function storeData(params) {
    localStorage.setItem("data",listcontainer.innerHTML)
    
}
function showData(){
    listcontainer.innerHTML=localStorage.getItem("data")
}
showData()