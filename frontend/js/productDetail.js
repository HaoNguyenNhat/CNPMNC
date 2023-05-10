

// id của sản phẩm
var id = "";

// hàm lấy id từ url
function getIdFromUrl() {
    var url = new URL(window.location.href);
    id = url.searchParams.get("id");
    console.log(id);
}

getIdFromUrl();

// gọi api lấy sản phẩm từ id
function callApiiGetProductId() {
    $.ajax({
        url: urlProductId + id,
        type: "GET",
        dataType: "json",
        success: function(res) {
          showProductDetail(res);
        },
        error: function(err) {
          alert(err);
        }
      })
}

callApiiGetProductId();

// hàm hiển thị sản phẩm lên trang
function showProductDetail(data) {
    // hiển thị sản phẩm
    $(".section-a").append(`<div class="container" style="align-items: stretch; justify-items: center;">
    <img src="images/f2.png" alt="" />
    <div>
        <h1>${data.productName}</h1>
        <h3 class="price">
        ${data.buyPrice} VNĐ
        </h3>
        <p>
        ${data.productDescription}
        </p>
        <div class="btn-box" style="justify-content: normal;">
        <a href="" class="btn1">
            Đặt món ngay !!!
        </a>
        </div>
    </div>
    </div>`)
}

