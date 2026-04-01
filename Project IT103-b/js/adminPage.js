//lấy mảng 
let currentAdmin = JSON.parse(localStorage.getItem("adminLogin")) || [];
//tạo check nếu chưa đăng nhập thì không được vô
if (currentAdmin.length === 0) {
    window.location.href = "login.html";
}
