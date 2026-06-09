async function logout() {

    //event.preventDefault(); // impede o "#" de interferir

    //localStorage.removeItem("user");

    //window.location.reload();
    //window.location.href = "../../pages/login.html";

    await fetch("http://localhost:3000/login/logout", {
        method: "POST",
        credentials: "include"
    });

    window.location.href = "login.html";
}