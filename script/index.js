const creatMenu = document.getElementById('create');
const input = document.getElementById('taskInput');
const creatForm = document.getElementById('creatTask'); 
const containers = document.querySelector('.creatTask');
creatMenu.addEventListener('click', (e)=>{
    e.preventDefault();
    containers.style.transition = 'opacity 0.5s ease-in-out';
    containers.style.opacity = '1'; 
    containers.style.display = 'inline';
})

creatForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const task = {
        taskName: input.value
    };
    const token = localStorage.getItem("token");
    if(token == null){
        alert("Your Token is Expired");
        window.location.href = "login.html";
    }
    else{
        const url = "http://localhost:3000/createTask";
        try{
        const createTask = await fetch(url, {
            method: "post",
            headers:{
                "content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(task)
        });
        if(!createTask.ok){
            const message = await createTask.json();
            alert(message);

            
        }
        else{
        const result = await createTask.json();
            alert(result);
           
        }
         window.location.href = "index.html"; 
      }
      catch(err){
        console.error(err);
      }        
    }
})



const url = "http://localhost:3000/viewTasks"
const fetchTasks = async () =>{
    const token = localStorage.getItem("token");
    if(token == null){
        alert("Your Token is Expired");
        window.location.href = "login.html";
        return;
    }
    try{
        const tasks = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!tasks.ok) {
            const errorData = await tasks.json();
           alert("Your Token is Expired");
           window.location.href = "login.html";
        }
        const data = await tasks.json();
        data.forEach(task => {
            const tbody = document.getElementById('allTask');
            const tr = document.createElement('tr');
            const checkboxTd = document.createElement('td');
            checkboxTd.innerHTML = `<input type="checkbox" name="taskCheckbox" data-task-id="${task}">${task}`;
            tr.appendChild(checkboxTd);
            const actionsTd = document.createElement('td');
            actionsTd.innerHTML = `
            <i class="fas fa-trash-alt icon" title="Delete Task" id="delete" data-task-id="${task}" onclick="deleteTask()"></i>
            <i class="fas fa-edit icon" title="Edit Task" id = "edit" data-task-id="${task}" onclick="editTask()"></i>
            `;
            tr.appendChild(actionsTd);
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching and rendering tasks:", error);
    }
 
};
fetchTasks();
function deleteTask(){
    const token = localStorage.getItem("token");
    if(token == null){
        alert("Your Token is Expired");
        window.location.href = "login.html";
        return;
    }
    const checkboxes = document.querySelectorAll('input[name="taskCheckbox"]:checked');
    const taskIds = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-task-id'));
    console.log(taskIds);
    if (taskIds){
      taskIds.forEach(async (e) => {
        console.log(e);
        try{
        const url = `http://localhost:3000/deleteTask/${e}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if (!response.ok) {
                const message = await response.json()
                alert(message)
            }
            const message =  await response.json();
            alert(message);
            window.location.href = "index.html";
        }
        catch(error){
            console.error("Error deleting task:", error);
        }
    })
}
}
function editTask(){
    const token = localStorage.getItem("token");
    if(token == null){
        alert("Your Token is Expired");
        window.location.href = "login.html";
        return;
    }
    const edit = document.querySelector('.updateTask')
    const input = document.getElementById('editInput')
    const checkboxes = document.querySelector('input[name="taskCheckbox"]:checked');
    const result = checkboxes.getAttribute('data-task-id');
    const currentValue = input.value = result;
    edit.style.transition = 'opacity 0.5s ease-in-out';
    edit.style.opacity = '1'; 
    edit.style.display = 'inline';
    const btn = document.getElementById('edit');
    btn.addEventListener('click', async (e)=>{
        e.preventDefault()
        const newTask = {
            updatedTaskName: input.value
        }
        const url = `http://localhost:3000/updateTask/${currentValue}`
           const update = await fetch(url,{
            method :"put",
             headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newTask)
            })
            if(update.ok){
                const message = await update.json()
                alert(message)
                window.location.href = "index.html";
            }
            
    })
}
 

// })    


    


