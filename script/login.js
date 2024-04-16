const form = document.getElementById('loginForm');
const password = document.getElementById('password');
const email = document.getElementById('email');
const error = document.getElementById('message'); 
form.addEventListener('submit', async (e) =>{
   e.preventDefault();
   const credentials = {
        email: email.value,
        Password: password.value
   }
  try{
   console.log(credentials);
   const uri = 'http://localhost:3000/login';
    const response = await fetch(uri,{
        method: "post",
        headers:{
            "content-Type" : "application/json",
        },
        body: JSON.stringify(credentials)
    })
    if(response.ok){
        const message = await response.json();
        localStorage.setItem('token', message);
        window.location.href = 'index.html';
    }
    else{
    const message = await response.json();
    error.innerHTML = message;
    }
}
catch (error){
    console.error("Fetch error:", error);
  }
})
