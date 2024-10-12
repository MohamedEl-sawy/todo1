let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks");
// localStorage.clear()

// empty array to store the task
let ArrayOfTasks=[];

// check if theres tasks in local storage
if (localStorage.getItem("tasks")) {
    ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}


// Trigger get data from local storage function
getDataFromLocalStorage();



//  ADD TASK
submit.onclick= function(){
    if (input .value !=="") {
        addTaskToArray(input.value);//add task to array tasks
        input.value = "";//empty input field
    }
}

// click on button delete
tasksdiv.addEventListener("click", (e)=>{
    // delete button
    if(e.target.classList.contains("del")){
        // remove element from page
        e.target.parentElement.remove();
        // remove task from LocalStorage
        deletTaskWith(e.target.parentElement.getAttribute("data-id"));    
    }
    // task elements
    if (e.target.classList.contains("task")) {
        // toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //  toggle done task
        e.target.classList.toggle("done");
    }
}) 


function addTaskToArray(tasktext){
    const task ={
        id : Date.now(),
        title : tasktext,
        completed : false,
    };
    // push task to array of tasks
    ArrayOfTasks.push(task);
    // Add Tasks to page
    addelementstopagefrom(ArrayOfTasks);
    // add tasks to local storage
    addDateToLocalStorage(ArrayOfTasks);
 
    
    
}

function addelementstopagefrom(ArrayOfTasks) {
    // empty tasks div
    tasksdiv.innerHTML="";
    // loop through array of tasks
    ArrayOfTasks.forEach((task) => {
        // create div for each task
        let div = document.createElement("div");
        div.className="task"
        // check if task is done
        if (task.completed ) {
            div.className="task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span = document.createElement("span");
        span.className ="del";
        span.appendChild(document.createTextNode("delete"));
        // append button to main div
        div.appendChild(span);
        // add task div to tasks container
        tasksdiv.appendChild(div);
    });
}

function addDateToLocalStorage(ArrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(ArrayOfTasks))
}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        // console.log(Tasks);
        addelementstopagefrom(tasks)
    }
}

function deletTaskWith(taskid) {
    // For Explain Only
//   for (let i = 0; i < ArrayOfTasks.length; i++) {
//     console.log(`${ArrayOfTasks[i].id} === ${taskid}`);
//   }
    ArrayOfTasks =ArrayOfTasks.filter((task)=> task.id !=taskid);
    addDateToLocalStorage(ArrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < ArrayOfTasks.length; i++) {
      if (ArrayOfTasks[i].id == taskId) {
        ArrayOfTasks[i].completed == false ? (ArrayOfTasks[i].completed = true) : (ArrayOfTasks[i].completed = false);
      }
    }
    addDateToLocalStorage(ArrayOfTasks);
  }