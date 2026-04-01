//lấy mảng 
let currentUser = JSON.parse(localStorage.getItem("usersLogin")) || [];
//tạo check 
if (currentUser.length === 0) {
    document.getElementById("logOut").style.display = "none";
    document.getElementById("logIn").style.display = "block";
    window.location.href = "login.html";
}
document.getElementById("logOut").style.display = "block";
document.getElementById("logIn").style.display = "none";
//hàm xóa khi đăng xuất 
function deletCurrentUser() {
   localStorage.removeItem("currentUser");
   window.location.href = "login.html";
}
//hiển thị check
let divCheck = document.getElementById("div_check");
function offForm() {
    divCheck.style.display = "none";
}
function renderForm() {
    divCheck.style.display = "block";
}
