//lấy mảng 
let currentAdmin = JSON.parse(localStorage.getItem("adminLogin")) || [];
//tạo check 
if (currentAdmin.length === 0) {
    window.location.href = "login.html";
}

