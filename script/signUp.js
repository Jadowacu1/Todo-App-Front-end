const form = document.getElementById('sign');
const email = document.getElementById('email');
const password = document.getElementById('password');
const conf  = document.getElementById('confirm');
const messageView = document.getElementById('message');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
 const Users = {
     email: email.value,
     Password: password.value,
     confirm: conf.value
 }
 try{
 const url = "http://localhost:3000/regist"; 
 const response = await fetch(url, {
    method:"post",
    headers:{
       "content-Type": "application/json"
    },
    body: JSON.stringify(Users)  
    })
    if(!response.ok){
       const message = await response.json();
       messageView.innerHTML = message;
    }
    const result = await response.json();
    alert(result);
    window.location.href = 'login.html';
}
catch (error) {
    console.error("Fetch error:", error);
  }
})
