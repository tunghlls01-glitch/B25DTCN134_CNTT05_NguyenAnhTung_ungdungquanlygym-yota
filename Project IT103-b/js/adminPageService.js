// biến lưu
// let services = [
//     { id: 1, nameServices: "Gym", describe: "Tập luyện với các thiết bị hiện đại", image: "../image/d405a43c2e91df2b44cac686ac97525ce247c5b6.jpg" },
//     { id: 2, nameServices: "Yoga", describe: "Thư giãn và can bằng tâm lý", image: "../image/c76c19de1febdf97cf79d8ed83568b0a54081504.jpg" },
//     { id: 3, nameServices: "Zumba", describe: "Đốt cháy calories với những điệu nhảy sôi động", image: "../image/7ef967fae24731f1d342cc2c22dbd1e6701e6e6e.png" }
// ];
// localStorage.setItem("services",JSON.stringify(services));
let services = JSON.parse(localStorage.getItem("services")) || [];
//lấy mảng 
let currentAdmin = JSON.parse(localStorage.getItem("adminLogin"));
//tạo check nếu chưa đăng nhập thì không được vô
if (!currentAdmin) {
    window.location.href = "login.html";
}

//hàm đăng xuất 
function outLogin(e) {
    e.preventDefault();
    localStorage.removeItem("adminLogin");
    window.location.href = "login.html"
}
//hiển thị check
let divCheck = document.getElementById("div_check");
function offForm() {
    divCheck.style.display = "none";
}
function renderForm() {
    divCheck.style.display = "block";
}
//hiển thị form add
let formAdd = document.getElementById("formAdd")
function onFormAdd() {
    let service = document.getElementById("service");
    let describe = document.getElementById("describe");
    let image = document.getElementById("image");
    service.value = "";
    describe.value = "";
    image.value = "";
    formAdd.style.display = "block";
    document.getElementById("btn_01").style.display = "block";
    document.getElementById("btn_02").style.display = "block";
    document.getElementById("btn_03").style.display = "none";
    document.getElementById("btn_04").style.display = "none";
    document.getElementById("formAdd_h1").innerText = "Thêm dịch vụ mới";
}
function offFormAdd() {
    formAdd.style.display = "none";
}

//hiển thị
function renderServices(services) {
    let html = "";
    services.forEach((value) => {
        return html += `
            <tr>
                <td>${value.nameServices}</td>
                <td>${value.describe}</td>
                <td><img src="${value.image}" alt=""></td>
                <td>
                    <button class="btnEdit" onclick="onEdit(${value.id})">Sửa</button>
                    <button class="btnDelete" onclick="formDelete(${value.id})">Xóa</button>
                </td>
            </tr>
        `
    });
    document.getElementById("tbody").innerHTML = html;
}
renderServices(services);
//hàm check trống
function errorServices(value, errorElement) {
    if (!value) {
        errorElement.innerText = "Không được để trống";
        errorElement.style.display = "block";
        return true;
    }
    errorElement.innerText = "";
    errorElement.style.display = "none"
    return false;
};
//thêm 
function addServices() {
    let service = document.getElementById("service");
    let describe = document.getElementById("describe");
    let image = document.getElementById("image");
    let errorService = document.getElementById("errorService");
    let errorDescribe = document.getElementById("errorDescribe");
    let errorImage = document.getElementById("errorImage");
    let check = true;
    //check trùng dịch vụ
    let arrNew = services.find((value) => {
        return value.nameServices === service.value;
    })
    if (errorServices(service.value, errorService)) {
        check = false;
    } else if (arrNew) {
        errorService.innerText = "Đã có dịch vụ này";
        errorService.style.display = "block";
        check = false;
    }
    if (errorServices(describe.value, errorDescribe)) {
        check = false;
    }
    if (errorServices(image.value, errorImage)) {
        check = false;
    }
    if (check) {
        let obj = {
            id: Math.ceil(Math.random() * 100000000),
            nameServices: service.value,
            describe: describe.value,
            image: image.value
        }
        services.push(obj);
        localStorage.setItem("services", JSON.stringify(services));
        renderServices(services);
        service.value = "";
        describe.value = "";
        image.value = "";
        offFormAdd();
    }
}
//hiện thị form xóa
let checkId;
function formDelete(id) {
    checkId = id;
    document.getElementById("div_check_delete").style.display = "block";
}
function offFormDelete() {
    document.getElementById("div_check_delete").style.display = "none";
}
//xóa 
function deleteService(id) {
    services = services.filter((value) => {
        return value.id !== id;
    });
    localStorage.setItem("services", JSON.stringify(services));
    renderServices(services);
    document.getElementById("div_check_delete").style.display = "none";
}
//sửa 
let checkIdEdit;
function onEdit(id) {
    document.getElementById("formAdd").style.display = "block";
    document.getElementById("btn_01").style.display = "none";
    document.getElementById("btn_02").style.display = "none";
    document.getElementById("btn_03").style.display = "block";
    document.getElementById("btn_04").style.display = "block";
    document.getElementById("formAdd_h1").innerText = "Sửa dịch vụ";
    checkIdEdit = id;
    let service = document.getElementById("service");
    let describe = document.getElementById("describe");
    let image = document.getElementById("image");
    let arrNew = services.find((value) => {
        return value.id === id;
    })
    service.value = arrNew.nameServices;
    describe.value = arrNew.describe;
    image.value = arrNew.image
}
//hàm sửa
function updateSercice(checkIdEdit) {
    let service = document.getElementById("service");
    let describe = document.getElementById("describe");
    let image = document.getElementById("image");
    let index = services.findIndex((value) => {
        return value.id == checkIdEdit;
    });
    let check = true;
    let errorService = document.getElementById("errorService");
    let errorDescribe = document.getElementById("errorDescribe");
    let errorImage = document.getElementById("errorImage");
    //check trùng dịch vụ
    let arrNew = services.find((value) => {
        return value.nameServices === service.value && value.id !== checkIdEdit;
    })
    if (errorServices(service.value, errorService)) {
        check = false;
    } else if (arrNew) {
        errorService.innerText = "Đã có dịch vụ này";
        errorService.style.display = "block";
        check = false;
    }
    if (errorServices(describe.value, errorDescribe)) {
        check = false;
    }
    if (errorServices(image.value, errorImage)) {
        check = false;
    }
    if (check) {
        services[index].nameServices = service.value;
        services[index].describe = describe.value;
        services[index].image = image.value;
        localStorage.setItem("services", JSON.stringify(services));
        renderServices(services);
        checkIdEdit = null;
        offFormAdd();
    }
}


