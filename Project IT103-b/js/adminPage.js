//lấy mảng 
let currentAdmin = JSON.parse(localStorage.getItem("adminLogin"));
//tạo check nếu chưa đăng nhập thì không được vô
if (!currentAdmin) {
    window.location.href = "login.html";
}

//hàm đăng xuất 
function outLogin(e) {
    e.preventDefault();
    localStorage.removeItem("adminLogin");
    window.location.href = "login.html"
}
//hiển thị check
let divCheck = document.getElementById("div_check");
function offForm() {
    divCheck.style.display = "none";
}
function renderForm() {
    divCheck.style.display = "block";
}