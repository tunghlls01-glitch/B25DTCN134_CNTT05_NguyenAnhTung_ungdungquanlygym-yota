let currentAdmin = JSON.parse(localStorage.getItem("adminLogin"));
//lấy tất cả lịch đặt user
let allBooks = Object.keys(localStorage)
    .filter(key => key.startsWith("books_"))
    .flatMap(key => JSON.parse(localStorage.getItem(key)) || []);

localStorage.setItem("allBooks", JSON.stringify(allBooks));
if (!currentAdmin) {
    window.location.href = "login.html";
}
//render books
let pageSize = 5;
let currentPage = 1;
function renderBooks(books) {
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let booksrender = books.slice(start, end);
    let html = "";
    booksrender.forEach((book) => {
        return html += `
        <tr>
            <td>${book.class}</td>
            <td>${book.date}</td>
            <td>${book.time}</td>
            <td>${book.name}</td>
            <td>${book.email}</td>
            <td>
                <button class="btnEdit">Sửa</button>
                <button class="btnDelete">Xóa</button>
            </td>
        </tr>            
        `
    });
    document.getElementById("tbody").innerHTML = html;
    renderPagination(books);
    
}
renderBooks(allBooks);
//hàm nút phân trang 
function renderPagination(books) {
    let html = "";
    let totalPage = Math.ceil(books.length / pageSize);
    for(let i = 1; i <= totalPage; i++) {
        html += `
        <button onclick="changePage(${i})">${i}</button>
        `
    }
    document.getElementById("pagination").innerHTML = html;
}
//hàm ấn trang
function changePage(page) {
    currentPage = page;
    renderBooks(allBooks);
}
//hàm tính tổng từng lớp đăng ký
function total(key) {
    return allBooks.reduce((acc, cur) => {
        if (cur.class.toLowerCase() === key.toLowerCase()) {
            return acc + 1;
        };
        return acc;
    }, 0);
}
document.getElementById("total_Gym").innerHTML = `${total("gym")}`;
document.getElementById("total_Yoga").innerHTML = `${total("yoga")}`;
document.getElementById("total_Zumba").innerHTML = `${total("zumba")}`;



