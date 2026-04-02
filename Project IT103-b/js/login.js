//lấy element trang
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");

let error_login = document.getElementById("error_login");

function login() {
    //lấy dữ liệu admin trên localStarage
    let adminsLogin = JSON.parse(localStorage.getItem("admins")) || [];
    //lấy dữ liệu user trên localStorage
    let usersLogin = JSON.parse(localStorage.getItem("users")) || [];
    //kiểm tra admin
    const findAdmin = adminsLogin.find(
        (admin) =>
            admin.email === loginEmail.value &&
            admin.password === loginPassword.value
    );
    //kiểm tra user
    const findUser = usersLogin.find(
        (user) =>
            user.email === loginEmail.value &&
            user.password === loginPassword.value
    );
    //điều kiện đăng nhập thành công
    if(findAdmin) {
        error_login.innerText = "";
        error_login.style.display = "none";
        localStorage.setItem("adminLogin", JSON.stringify(findAdmin));
        setTimeout(function () {
            document.getElementById("status").style.display = "block";
        }, 1);
        setTimeout(function(){
            window.location.href = "adminPageService.html";
        }, 1000)
    } else if (findUser) {
        error_login.innerText = "";
        error_login.style.display = "none";
        setTimeout(function () {
            document.getElementById("status").style.display = "block";
        }, 1);
        localStorage.setItem("usersLogin", JSON.stringify(findUser));
        setTimeout(function () {
            window.location.href = "homePage.html"
        }, 1000)
    } else {
        error_login.innerText = "Email hoặc mật khẩu sai";
        error_login.style.display = "block";
    }
}