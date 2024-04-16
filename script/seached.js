const btn = document.getElementById('searchBtn');
const searchBox = document.querySelector('.search');
btn.addEventListener('click', async(e) =>{
     e.preventDefault();
    const token = localStorage.getItem("token");
    if(token == null){
        alert("Your Token is Expired");
        window.location.href = "login.html";
        return;
    }

    const input = document.getElementById('searchInput');
    const task = {
        taskName : input.value
    }
    const url = `http://localhost:3000/search/${input.value}`;
    
    
    const searched = await fetch(url,{
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
     });
    if(!searched.ok){
        const message = await searched.json()
        alert(message);
        searchBox.style.display = "none"
    }
    else{
    const message = await searched.json()
    
      const tbody = document.getElementById('myview');
        const tr = document.createElement('tr');
        const checkboxTd = document.createElement('td');
        checkboxTd.innerHTML = `<input type="checkbox" name="taskCheckbox" data-task-id="${message}">${message}`;
        tr.appendChild(checkboxTd);
        const actionsTd = document.createElement('td');
        actionsTd.innerHTML = `
        <i class="fas fa-trash-alt icon" title="Delete Task" id="delete" data-task-id="${message}" onclick="deleteTask()"></i>
        <i class="fas fa-edit icon" title="Edit Task" id = "edit" data-task-id="${message}" onclick="editTask()"></i>
        `;
        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
       searchBox.style.display= "none";
    }
    });
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