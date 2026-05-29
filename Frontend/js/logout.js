function logout(event) {

    event.preventDefault(); // impede o "#" de interferir

    localStorage.removeItem("user");

    window.location.reload();
    window.location.href = "../../pages/login.html";
}