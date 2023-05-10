
// Biến lưu mảng sản phẩm
var gProductArray = [];
var gProductLineArr = [];
// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gPRODUCT_COLS = [
    "id",
    "photo1",
    "productName",
    "productDescription",
    "buyPrice",
    "productLine.productLine",
    "action"
];


// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gID_COL = 0;
const gANH_COL = 1;
const gTEN_SAN_PHAM_COL = 2;
const gMO_TA_COL = 3;
const gGIA_COL = 4;
const gLOAI_SAN_PHAM_COL = 5;
const gACTION_COL = 6;

// Khai báo DataTable & mapping columns
var gUserTable = $("#user-table").DataTable({
    columns: [
        { data: gPRODUCT_COLS[gID_COL] }, 
        { data: gPRODUCT_COLS[gANH_COL] }, 
        { data: gPRODUCT_COLS[gTEN_SAN_PHAM_COL] }, 
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
function onBtnAddProduct() {
    $("#insert-new-product").modal("show");
    
}

function onBtnAddModal() {
    // lấy data từ form modal
    var dataInfo = {
        productName: "",
        productDescription:"",
        photo1: "",
        buyPrice: "",
    }
    var productLineid = {
        productLineid: ""
    };
    getDataFromModal(dataInfo, productLineid);
    console.log(dataInfo.photo1);
    var isValid = validateModalInsert(dataInfo);
    if(isValid) {
        handleAddClick(dataInfo, productLineid);
    }
}
function getDataFromModal(dataInfo, productLineid) {
    var productName = $("#input-insert-ten").val();
    var photo = $("#input-insert-anh")[0].files[0].name;
    var des = $("#input-insert-description").val();
    var gia = $("#input-insert-gia").val();
    var productLine = $("#select-insert-productLine").val();

    dataInfo.productName = productName;
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
    if(dataInfo.description == "") {
        alert("Bạn cần nhập mô tả");
        return false;
    }
    if(dataInfo.photo == "") {
        alert("Bạn cần chọn ảnh");
        return false;
    }
    if(dataInfo.buyPrice == "") {
        alert("Bạn cần nhập gái tiền");
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

function callApiCreateProduct() {
    
}