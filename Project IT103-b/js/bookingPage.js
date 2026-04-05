//lấy dữ liệu loca user
let usersLogin = JSON.parse(localStorage.getItem("usersLogin")) || [];
//lấy lịch riêng
let books = JSON.parse(localStorage.getItem(`books_${usersLogin.email}`)) || [];
//chặn chưa đăng nhập 
if (usersLogin.length === 0) {
    window.location.href ="login.html";
}
//hiển thị form
function renderForm() {
    document.getElementById("formAdd").style.display = "block";
}
let formAdd = document.getElementById("formAdd")
//tạo nút hiện form điền
function showForm() {
    formAdd.style.display = "block";
    document.getElementById("formAdd_h1").innerText = "Đặt lịch mới";
    document.getElementById("btn_02").style.display = "block";
    document.getElementById("btn_03").style.display = "none";
    document.getElementById("btn_01").style.display = "block";
    document.getElementById("btn_04").style.display = "none";
}
//tắt form điền
function closeForm() {
    formAdd.style.display = "none";
    classRoom.value = "";
    time.value = "";
    date.value = "";
    error_one.innerText = "";
    error_two.innerText = "";
    error_three.innerText = "";
    document.getElementById("btn_02").style.display = "block";
    document.getElementById("btn_03").style.display = "none";
    document.getElementById("btn_01").style.display = "block";
    document.getElementById("btn_04").style.display = "none";
}
let divCheck = document.getElementById("div_check")
//tạo nút hiện xác nhận
let checkIndexID;
function showDelete(id) {
    checkIndexID = id;
    divCheck.style.display = "block";
}
//tạo nút mất xác nhận 
function offForm() {
    divCheck.style.display = "none";
}
//lấy check error
let error_one = document.getElementById("error_one");
let error_two = document.getElementById("error_two");
let error_three = document.getElementById("error_three");
//lấy các dữ liệu
let classRoom = document.getElementById("classRooms");
let time = document.getElementById("time");
let date = document.getElementById("date");
//hàm hiển thị phân trang
let pageSize = 3;
let currentPage = 1;
function renderList(books) {
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let booksrender = books.slice(start, end);
    let html = "";
    booksrender.forEach(book => {
        html += `
                <tr>
                    <td>${book.class.toUpperCase()}</td>
                    <td>${book.date}</td>
                    <td>${book.time}</td>
                    <td>${book.name}</td>
                    <td>${book.email}</td>
                    <td>
                        <button class="btnEdit" onclick="updateBook(${book.bookingId})">Sửa</button>
                        <button class="btnDelete" onclick="showDelete(${book.bookingId})">Xóa</button>
                    </td>
                </tr>  
            `;
    });
    document.getElementById("tbody").innerHTML = html;
    renderPagination(books);
}
renderList(books);
//hàm render phân trang
function renderPagination(books) {
    let html = "";
    let totalPage = Math.ceil(books.length / pageSize);
    for (let i = 1; i <= totalPage; i++) {
        html += `
                <button onclick="changePage(${i})">${i}</button>     
            `
    }
    document.getElementById("pagination").innerHTML = html;
}
//chuyển trang
function changePage(page) {
    currentPage = page;
    renderList(books);
}
//hàm validate bị trống 
function empty_condition(value, errorElement) {
    if (!value) {
        errorElement.innerText = "Không được để trống"
        errorElement.style.display = "block"
        return false;
    }
    errorElement.innerText = "";
    errorElement.style.display = "none";
    return true;
}
// hàm thêm
function addLists() {
    let check = true;
    error_one.innerText = "";
    error_two.innerText = "";
    error_three.innerText = "";
    error_one.style.display = "none";
    error_two.style.display = "none";
    error_three.style.display = "none";
    //kiểm tra trùng
    let arrCheck = books.find((value) => {
        return value.time === time.value && value.date === date.value;
    });
    //kiểm tra không đặt ngày sau ngày hiện tại
    let currentDate = new Date().toISOString().split("T")[0];
    if (!empty_condition(classRoom.value, error_one)) {
        check = false;
    }
    if (!empty_condition(date.value, error_two)) {
        check = false;
    } else if (date.value < currentDate) {
        error_two.innerText = "Ngày đã cũ";
        error_two.style.display = "block";
        check = false;
    }
    if (!empty_condition(time.value, error_three)) {
        check = false;
    }
    if (arrCheck) {
        error_three.innerText = "Đã có lớp trong khung giờ đó";
        error_three.style.display = "block";
        check = false;
    }
    if (check) {
        let obj = {
            bookingId: Date.now(),
            userId: usersLogin.id,
            name: usersLogin.name,
            email: usersLogin.email,
            date: date.value,
            class: classRoom.value,
            time: time.value
        };
        books.push(obj);
        localStorage.setItem(`books_${usersLogin.email}`, JSON.stringify(books));
        renderList(books);
        date.value = "";
        classRoom.value = "";
        time.value = "";
        formAdd.style.display = "none";
    }
}
//xóa 
function deleteBook(id) {
    books = books.filter(value => value.bookingId !== id);
    localStorage.setItem(`books_${usersLogin.email}`, JSON.stringify(books));
    renderList(books);
    offForm();
}
//hiện form sửa 
function showFormUpdate() {
    formAdd.style.display = "block";
    document.getElementById("formAdd_h1").innerText = "Sửa lịch";
    document.getElementById("btn_02").style.display = "none";
    document.getElementById("btn_03").style.display = "block";
    document.getElementById("btn_01").style.display = "none";
    document.getElementById("btn_04").style.display = "block";
    error_one.style.display = "block";
    error_two.style.display = "block";
    error_three.style.display = "block";
}
//lấy id sửa
let editId;
function updateBook(id) {
    showFormUpdate();
    editId = id;
    let book = books.find(value => value.bookingId === id);
    classRoom.value = book.class;
    date.value = book.date;
    time.value = book.time;
}
//hàm lưu
function saveBook() {
    let check = true;
    //kiểm tra trùng 
    let arrCheck = books.find((value) => {
        return value.time === time.value && value.date === date.value;
    });
    //kiểm tra không đặt ngày sau ngày hiện tại
    let currentDate = new Date().toISOString().split("T")[0];
    if (!empty_condition(classRoom.value, error_one)) {
        check = false;
    }
    if (!empty_condition(date.value, error_two)) {
        check = false;
    } else if (date.value < currentDate) {
        error_two.innerText = "Ngày đã cũ";
        check = false;
    }
    if (!empty_condition(time.value, error_three)) {
        check = false;
    }
    if (arrCheck) {
        error_three.innerText = "Đã có lớp trong khung giờ đó"
        check = false;
    }
    if (check) {
        let index = books.findIndex(value => value.bookingId === editId);
        books[index].class = classRoom.value;
        books[index].date = date.value;
        books[index].time = time.value;
        localStorage.setItem(`books_${usersLogin.email}`, JSON.stringify(books));
        renderList(books);
        editId = null;
        closeForm();
    }
}
