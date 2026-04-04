//lấy mảng 
let currentUser = JSON.parse(localStorage.getItem("usersLogin"));
let currentAdmin = JSON.parse(localStorage.getItem("adminLogin"));
//tạo check 
if (!currentUser && !currentAdmin) {
    document.getElementById("logOut").style.display = "none";
    document.getElementById("logIn").style.display = "block";
    window.location.href = "login.html";
} else if (currentUser) {
    //check user đăng nhập
    document.getElementById("logOut").style.display = "block";
    document.getElementById("logIn").style.display = "none";
    document.getElementById("admin").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("book").style.display = "block";
} else if (currentAdmin) {
    //admin đăng nhập
    document.getElementById("admin").style.display = "block";
    document.getElementById("logOut").style.display = "block";
    document.getElementById("logIn").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("book").style.display = "none";
}
//hàm xóa khi đăng xuất user
function deletCurrentUser(e) {
    e.preventDefault();
    localStorage.removeItem("usersLogin");
    localStorage.removeItem("adminLogin");
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

let services = JSON.parse(localStorage.getItem("services"))
//hàm hiển thị bên trang chủ 
function renderHomePage(services) {
    let html = "";
    services.forEach((value) => {
        return html += `
            <div class="card">
                <div class="card_image">
                    <img src="${value.image}" alt="">
                </div>
                <div class="card_main">
                    <h3>${value.nameServices}</h3>
                    <p>${value.describe}</p>
                    <button>Đặt lịch</button>
                </div>
            </div>
        `
    })
    document.getElementById("all_card").innerHTML = html;
}
renderHomePage(services);

