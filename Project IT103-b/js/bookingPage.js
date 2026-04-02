//lấy dữ liệu loca user
let usersLogin = JSON.parse(localStorage.getItem("usersLogin")) || [];
//lấy lịch riêng
let books = JSON.parse(localStorage.getItem(`books_${usersLogin.email}`)) || [];
//hiển thị form
function renderForm() {
    document.getElementById("formAdd").style.display = "block";
}
let formAdd = document.getElementById("formAdd")
//tạo nút hiện form điền
function showForm() {
    formAdd.style.display = "block";
}
//tắt form điền
function closeForm() {
    formAdd.style.display = "none";
    classRoom.value = "";
    time.value = "";
    date.value = "";
    error.innerText = "";
    error.style.display = "none";
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
let error = document.getElementById("error");
//lấy các dữ liệu
let classRoom = document.getElementById("classRooms");
let time = document.getElementById("time");
let date = document.getElementById("date");
//hàm hiển thị
function renderList(books) {
    let html = "";
    books.forEach(book => {
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
}
renderList(books);
// hàm thêm
function addLists() {
    //kiểm tra trùng
    let arrCheck = books.find((value) => {
        return value.time === time.value && value.date === date.value;
    });
    if (!classRoom.value || !date.value || !time.value) {
        error.innerText = "Vui lòng nhập đầy đủ thông tin";
        error.style.display = "block";
        return;
    } else if (arrCheck) {
        error.innerText = "Khoảng thời gian đó đã có lớp";
        error.style.display = "block";
        return;
    } else {
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
    error.style.display = "none";
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
    //kiểm tra trùng 
    let arrCheck = books.find((value) => {
        return value.time === time.value && value.date === date.value;
    });
    if (!classRoom.value || !date.value || !time.value) {
        error.innerText = "Nhập đầy đủ";
        error.style.display = "block";
        return;
    } else if (arrCheck && arrCheck.bookingId !== editId) {
        error.innerText = "Thời gian đó có lớp học ";
        error.style.display = "block";
        return;
    } else {
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
