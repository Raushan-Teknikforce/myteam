document.addEventListener("DOMContentLoaded", function() {
    let name = document.getElementById("name");
    let password = document.getElementById("password");
    let email = document.getElementById("email");
    let submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Clicked");
        let user = {
            name: name.value,
            email: email.value,
            password: password.value
        };
        console.log(user);
        window.electronAPI.registerUser(user);
        name.value = "";
        password.value = "";
        email.value = "";
    });

 
});
