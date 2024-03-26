
document.addEventListener("DOMContentLoaded", function() {
    let password = document.getElementById("password");
    let email = document.getElementById("email");
let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let loginuser = {
        email: email.value,
        password: password.value
    };
    console.log(loginuser);
    window.electronAPI.login(loginuser);
    password.value = "";
    email.value = "";
})
});