//lấy các ô để hiển thị lỗi
let error_name = document.getElementById("error_name");
let error_email = document.getElementById("error_email");
let error_password = document.getElementById("error_password");
let error_confirmPassword = document.getElementById("error_confirmPassword");
// lấy dữ liệu localStorages
let users = JSON.parse(localStorage.getItem("users")) || [];
//hàm validate trống
function empty_condition(value, errorElement, name) {
    if (value.trim() === "") {
        errorElement.innerText = name + " không được để trống"
        return false;
    }
    errorElement.innerText = "";
    errorElement.style.display = "none";
    return true;
}
//hàm định dạng email 
function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
//đối tượng admin
let admins = [
    {
        id: Math.ceil(Math.random() * 10000000000000),
        name: "Nguyễn Anh Tùng",
        email: "anhtungls01@gmail.com",
        role: "admin",
        password: "anhtung01"
    },
    {
        id: Math.ceil(Math.random() * 10000000000000),
        name: "Nguyễn Tùng",
        email: "nguyentungls01@gmail.com",
        role: "admin",
        password: "nguyentung01"
    }
];
//lưu đối tượng addmin
localStorage.setItem("admins", JSON.stringify(admins));
//hàm check điều kiện 
function addlogin() {
    //lấy
    let name = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let check = true;
    if (!empty_condition(name, error_name, "họ và tên")) {
        check = false;
    }
    if (!empty_condition(email, error_email, "Email")) {
        check = false;
    } else if (users.some(value => value.email === email)) {
        error_email.innerText = "Tồn tại email";
        error_email.style.display = "block"
        check = false;
    } else if (!validateEmail(email)) {
        error_email.innerText = "Email không đúng định dạng";
        error_email.style.display = "block"
        check = false;
    } else {
        error_email.innerText = "";
        error_email.style.display = "none";
    }
    if (!empty_condition(password, error_password, "Mật khẩu")) {
        check = false;
    } else if (password.length < 8) {
        error_password.innerText = "password phải lớn hơn 8 kí tự";
        error_password.style.display = "block"
        check = false;
    } else {
        error_password.innerText = "";
        error_password.style.display = "none";
    }
    if (!empty_condition(confirmPassword, error_confirmPassword, "Xác nhận mật khẩu")) {
        check = false;
    } else if (password !== confirmPassword) {
        error_confirmPassword.innerText = "Mật khẩu không trùng khớp";
        error_confirmPassword.style.display = "block"
        check = false;
    } else {
        error_confirmPassword.innerText = "";
        error_confirmPassword.style.display = "none";
    }
    if (check) {
        let user = {
            id: Math.ceil(Math.random() * 10000000000000),
            name: name,
            email: email,
            role: "user",
            password: password
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        setTimeout(function () {
            document.getElementById("status").style.display = "block";
        }, 1);
        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);
    }
}

