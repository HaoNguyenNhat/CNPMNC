
// Biến lưu mảng sản phẩm
var gProductArray = [];
var gProductLineArr = [];
var dataToUpdate = [];

// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gPRODUCT_COLS = [
    "id",
    "photo1",
    "productName",
    "productCode",
    "productDescription",
    "buyPrice",
    "productLine.productLine",
    "action"
];


// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gID_COL = 0;
const gANH_COL = 1;
const gTEN_SAN_PHAM_COL = 2;
const gMA_SAN_PHAM_COL = 3;
const gMO_TA_COL = 4;
const gGIA_COL = 5;
const gLOAI_SAN_PHAM_COL = 6;
const gACTION_COL = 7;

// Khai báo DataTable & mapping columns
var gUserTable = $("#user-table").DataTable({
    columns: [
        { data: gPRODUCT_COLS[gID_COL] }, 
        { data: gPRODUCT_COLS[gANH_COL] }, 
        { data: gPRODUCT_COLS[gTEN_SAN_PHAM_COL] }, 
        { data: gPRODUCT_COLS[gMA_SAN_PHAM_COL] }, 
        { data: gPRODUCT_COLS[gMO_TA_COL] }, 
        { data: gPRODUCT_COLS[gGIA_COL] }, 
        { data: gPRODUCT_COLS[gLOAI_SAN_PHAM_COL] }, 
        { data: gPRODUCT_COLS[gACTION_COL] }, 
    ],
    columnDefs: [
        { // định nghĩa lại cột action
            targets: gACTION_COL,
            defaultContent: `
      <img class="edit-user" src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" style="width: 20px;cursor:pointer;">
      <img class="delete-user" src="https://cdn4.iconfinder.com/data/icons/complete-common-version-6-4/1024/trash-512.png" style="width: 20px;cursor:pointer;">
    `
    },
    { // định nghĩa lại cột logo image
        targets: gANH_COL,
        render: function(data,type,row){
            return `<img src="images/${data}", width= 80px />`},
    }]
});

// nút thêm sản phẩm 
$("#btn-create-product").on("click", function() {
    onBtnAddProduct();
})

$("#btn-insert-modal-product").on("click", function() {
    onBtnAddModal();
})
// hàm xử lý thêm sản phẩm
function onBtnAddProduct() {
    $("#insert-new-product").modal("show");
}

//gán sự kiện Update - Sửa 1 user
$("#user-table").on("click", ".edit-user",function() {
    onBtnEditUserClick(this);
});

// nút sửa sản phẩm
$("#btn-update-product").on("click", function() {
    onBtnEditProduct();
})
// Gọi Api lấy toàn bộ dữ liệu
function callApiGetAllProduct() {
    $.ajax({
        async: false,
        url: "http://localhost:8080/fastfood/api/noauth/product",
        type: "GET",
        dataType: 'json',
        success: function(res) {
            gProductArray = res;
            console.log(gProductArray);
        },
        error: function(ajaxContent) {
            alert(ajaxContent);
        }
    })
}

// gọi api lấy loại sản phẩm
function callApiGetProductLine() {
    $.ajax({
        async: false,
        url: "http://localhost:8080/fastfood/api/noauth/product-line",
        type: "GET",
        dataType: 'json',
        success: function(res) {
            gProductLineArr = res;
            console.log(gProductLineArr);
        },
        error: function(ajaxContent) {
            alert(ajaxContent);
        }
    })
}
function onPageLoading() {
    callApiGetAllProduct();
    loadDataToUserTable(gProductArray);
    loadDataToSelectProductLine();
}

function loadDataToUserTable(gProductArray) {
    gUserTable.clear();
    gUserTable.rows.add(gProductArray);
    gUserTable.draw();
};

function loadDataToSelectProductLine() {
    callApiGetProductLine();
    for(var i = 0 ; i < gProductLineArr.length; i ++) {
        $('#select-insert-productLine').append($('<option>', {
            value: gProductLineArr[i].id,
            text: gProductLineArr[i].productLine
        }));
    }
    
}



function onBtnAddModal() {
    // lấy data từ form modal
    var dataInfo = {
        productName: "",
        productCode: "",
        productDescription:"",
        photo1: "",
        buyPrice: "",
    }
    var productLineid = {
        productLineid: ""
    };
    getDataFromModal(dataInfo, productLineid);
    console.log(dataInfo);
    var isValid = validateModalInsert(dataInfo);
    if(isValid) {
        handleAddClick(dataInfo, productLineid);
    }
}
function getDataFromModal(dataInfo, productLineid) {
    var productName = $("#input-insert-ten").val();
    var productCode = $("#input-insert-ma").val();
    var photo = $("#input-insert-anh").val().replace(/C:\\fakepath\\/i, '');
    var des = $("#input-insert-description").val();
    var gia = $("#input-insert-gia").val();
    var productLine = $("#select-insert-productLine").val();


    dataInfo.productName = productName;
    dataInfo.productCode = productCode;
    dataInfo.productDescription = des;
    dataInfo.photo1 = photo;
    dataInfo.buyPrice = gia;
    productLineid.productLineid = productLine;
}

function validateModalInsert(dataInfo) {
    if(dataInfo.productName == "") {
        alert("Bạn cần nhập tên sản phẩm");
        return false;
    }
    if(dataInfo.productCode == "") {
        alert("Bạn cần nhập mã sản phẩm");
        return false;
    }
    if(dataInfo.photo1 == "") {
        alert("Bạn cần chọn ảnh");
        return false;
    }
    if(dataInfo.productDescription == "") {
        alert("Bạn cần nhập mô tả");
        return false;
    }
    if(dataInfo.buyPrice == "") {
        alert("Bạn cần nhập giá tiền");
        return false;
    }
    return true;
}

function handleAddClick(dataInfo, productLineid) {
    $.ajax({
        url: "http://localhost:8080/fastfood/api/noauth/product" + "?productLineId=" + productLineid.productLineid,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataInfo),
        success: function(res) {
            alert("tạo sản phẩm thành công");
            $("#insert-new-product").modal("hide"); 
            location.reload();
            
        },
        error: function(ajaxContent) {
            alert(ajaxContent);
        }
    })
}

function onBtnEditUserClick(button) {
    var data = gUserTable.row($(button).parents('tr')).data();
    dataToUpdate = data;
    console.log(data);
    showInfoProduct(data);
    $("#update-product").modal("show");
}

function showInfoProduct(data) {
    $("#input-update-ten").val(data.productName);
    $("#input-update-ma").val(data.productCode);
    $("#input-update-description").val(data.productDescription);
    $("#input-update-gia").val(data.buyPrice);
}

function onBtnEditProduct() {
    var dataProduct = {
        productName: "",
        productCode: "",
        buyPrice: 0,
        photo1: dataToUpdate.photo1,
        productDescription: ""
    }
    getDataProduct(dataProduct);
    $("#input-update-anh").on("change", function() {
        dataProduct.photo1 = $("#input-update-anh").val().replace(/C:\\fakepath\\/i, '');
    })
    console.log(dataProduct);
    // $.ajax({
    //     url: "http://localhost:8080/fastfood/api/noauth/product/" + dataToUpdate.id,
    //     type: "PUT",
    //     contentType: "application/json;charset=UTF-8",
    //     data: JSON.stringify(dataProduct),
    //     success: function(res) {
    //         alert("Sửa sản phẩm thành công");
    //         location.reload();
    //     },
    //     error: function(err) {
    //         alert(err);
    //     }
    // })
}

function getDataProduct(data) {
    data.productName = $("#input-update-ten").val();
    data.productCode = $("#input-update-ma").val();
    data.buyPrice = $("#input-update-gia").val();
    data.productDescription = $("#input-update-description").val();
}