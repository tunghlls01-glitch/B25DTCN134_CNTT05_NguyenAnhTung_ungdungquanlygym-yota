//lấy dữ liệu loca
let usersLogin = JSON.parse(localStorage.getItem("usersLogin")) || [];
//tạo đặt lịch riêng
let books = JSON.parse(localStorage.getItem(`books_${usersLogin.email}`)) || [];
//hiển thị form
function renderForm() {
    document.getElementById("formAdd").style.display = "block"
}
let formAdd = document.getElementById("formAdd")
//tạo nút hiện form điền
function showForm() {
    formAdd.style.display = "block";
}
//tạo nút tắt form điền
function closeForm() {
    formAdd.style.display = "none"
    date.value = "";
    classRoom.value = "";
    time.value = "";
    error.innerText = "";
    error.style.display = "none";
}
//lấy check error
let error = document.getElementById("error");
//lấy các dữ liệu
let classRoom = document.getElementById("classRooms");
let time = document.getElementById("time");
let date = document.getElementById("date");
// let books = [
//     {
//         ...usersLogin,
//         date: "2026-04-01",
//         class: "Gym",
//         time: "07:00 - 09:00"
//     }
// ];
// localStorage.setItem("books", JSON.stringify(books));
// hiển thị dữ liệu
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
                    <button class="btnEdit">Sửa</button>
                    <button class="btnDelete" onclick="deleteBook(${book.bookingId})">Xóa</button>
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
}
