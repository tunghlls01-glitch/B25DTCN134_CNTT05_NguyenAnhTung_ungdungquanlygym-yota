    //lấy các ô để hiển thị lỗi
let error_name = document.getElementById("error_name");
let error_email = document.getElementById("error_email");
let error_password = document.getElementById("error_password");
let error_confirmPassword = document.getElementById("error_confirmPassword");
function empty_condition (value,errorElement, name) {
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
function addlogin() {
    //lấy
    let name = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let check = true;
    if (!empty_condition (name,error_name, "họ và tên")) {
        check = false;
    }
    if (!empty_condition (email,error_email, "Email")) {
        check = false;
    } else if(!validateEmail(email)) {
        error_email.innerText = "Email không đúng định dạng";
        error_email.style.display = "block"
        check = false;
    } else {
        error_email.innerText = "";
        error_email.style.display = "none";
    }
    if (!empty_condition (password,error_password, "Mật khẩu")) {
        check = false;
    } else if (password.length < 8) {
        error_password.innerText = "password phải lớn hơn 8 kí tự";
        error_password.style.display = "block"
        check = false;
    } else {
        error_password.innerText = "";
        error_password.style.display = "none";
    }
    if (!empty_condition (confirmPassword,error_confirmPassword,"Xác nhận mật khẩu")) {
        check = false;
    }  else if (password !== confirmPassword) {
        error_confirmPassword.innerText = "Mật khẩu không trùng khớp";
        error_confirmPassword.style.display = "block"
        check = false;
    } else {
        error_confirmPassword.innerText = "";
        error_confirmPassword.style.display = "none";
    }
    if (check) {
        let user = {
            name: name,
            email: email,
            password: password
        };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công");
        window.location.href = "homePage.html";
    }
}

