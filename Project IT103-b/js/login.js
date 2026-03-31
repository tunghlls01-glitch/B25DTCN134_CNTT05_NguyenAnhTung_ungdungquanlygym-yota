//lấy element trang
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");

let error_login = document.getElementById("error_login");
//đối tượng admin
let admin = {
    id: Math.ceil(Math.random() * 10000000000000),
    name: "Nguyễn Anh Tùng",
    email: "anhtungls01@gmail.com",
    role: "admin",
    password: "anhtung01"
}
function login() {
    //lấy dữ liệu trên localStorage
    let usersLogin = JSON.parse(localStorage.getItem("users")) || [];
    const findUser = usersLogin.find(
        (user) =>
            user.email === loginEmail.value &&
            user.password === loginPassword.value);
    if(!findUser) {
        error_login.innerText = "Email hoặc mật khẩu sai";
        error_login.style.display ="block";
    } else {
        error_login.innerText = "";
        error_login.style.display ="none";
        setTimeout(function(){
            document.getElementById("status").style.display = "block";
        }, 1);
        localStorage.setItem("usersLogin", JSON.stringify(findUser));
        setTimeout(function(){
            window.location.href = "homePage.html"
        }, 1000)
    }
        
}