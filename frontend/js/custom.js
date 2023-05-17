//---------------------------Vùng khai báo biến toàn cục---------------------------------------//
const token = getCookie("token");
//Khai báo xác thực ở headers
var headers = {
    Authorization: "Bearer " + token
};

var userInfo = {};
var urlInfo = "http://localhost:8080/users/me";
// url lấy toàn bộ sản phẩm
const urlProduct = "http://localhost:8080/fastfood/api/noauth/product";

//url lấy sản phẩm bằng id
const urlProductId = "http://localhost:8080/fastfood/api/noauth/product/detail/"
// mảng chứa giỏ hàng
var giohang = [];

var listProduct = [];
// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
  // gọi api hiển thị sản phẩm
  $.ajax({
    url: urlProduct,
    type: "GET",
    async: false,
    dataType: "json",
    success: function(res) {
      listProduct = res;
    },
    error: function(err) {
      toastr.options.preventDuplicates = true;
      toastr.error("Dữ liệu sản phẩm gặp lỗi !");
    }
  })
  // hiển thị sản phẩm
  for(var i = 0 ; i < listProduct.length; i ++) {
    $(".grid").append(`<div class="col-sm-6 col-lg-4 all ${listProduct[i].productLine.productLine}">
      <div class="box">
        <div >
          <div class="img-box">
            <img src="images/${listProduct[i].photo1}" alt="">
          </div>
          <div class="detail-box product">
            <h5 class="name-product" id="${listProduct[i].id}">
              ${listProduct[i].productName}
            </h5>
            <p>
              ${listProduct[i].productDescription}
            </p>
          <div class="options">
            <h6 class="price">
              ${listProduct[i].buyPrice} VNĐ
            </h6>
            <a id="${listProduct[i].id}" class="add-to-cart fa fa-shopping-cart" data-name="Product Name" data-price="100"></a>
          </div>
        </div>
      </div>
    </div>
  </div>`)
  }
  
  
  
  $('.filters_menu li').click(function () {
    $('.filters_menu li').removeClass('active');
    $(this).addClass('active');

    var data = $(this).attr('data-filter');
    $grid.isotope({
        filter: data
    })
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
        columnWidth: ".all"
    }
  })

  $.ajax({
    url: urlInfo,
    method: "GET",
    async: false,
    headers: headers,
    success: function(responseObject) {
      userInfo = responseObject;
        console.log(responseObject);
    },
    error: function(xhr) {
        console.log(xhr);
        // Khi token hết hạn, AJAX sẽ trả về lỗi khi đó sẽ redirect về trang login để người dùng đăng nhập lại
        //redirectToLogin()
    }
  });

  if(token) {
    $("#user_link").removeAttr("href");
    $("#user_link").addClass("dropdown");
    $(".fa-user").attr("data-toggle", "dropdown");
    $(".fa-user").attr("aria-haspopup", "true");
    $(".fa-user").attr("aria-expanded", "false");
    $("#user_link").append(` <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="#">${userInfo.username}</a>
    <a class="dropdown-item" href="profile.html">Thông tin của bạn</a>
    <a id="log-out" class="dropdown-item">Đăng xuất</a>
  </div>`)
  }
  // nút thêm sản phẩm vào giỏ hàng
  $(".add-to-cart").on("click", function() {
    onBtnAddToCart(this);
  })

  $(".name-product").on("click", function() {
    onNameProductClick(this);
  })

  // Nút đăng xuất
  $("#log-out").on("click", function() {
    sessionStorage.removeItem("giohang");
    redirectToLogin();
  })
});

loadCountCart();

// nice select
$(document).ready(function() {
    $('select').niceSelect();
});

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

//--------------------------Sự kiện bấm các nút----------------------------------------//

//---------------------------Hàm xử lý sự kiện---------------------------------------//
// Sự kiện bấm nút add to cart
function onBtnAddToCart(btnAddToCart) {
  $.ajax({
    url: urlProductId + btnAddToCart.id,
    type: "GET",
    dataType: "json",
    success: function(res) {
      handleBtnAddToCart(res, btnAddToCart);
    },
    error: function(err) {
      alert(err);
    }
  })
}

// Sự kiện ấn tên sản phẩm
function onNameProductClick(btnNameProduct) {
  $.ajax({
    url: urlProductId + btnNameProduct.id,
    type: "GET",
    dataType: "json",
    success: function(res) {
      handleBtnNameClick(res);
    },
    error: function(err) {
      alert(err);
    }
  })
} 
//---------------------------Hàm dùng chung---------------------------------------//

// hàm xử lý khi bấm bút add to cart
function handleBtnAddToCart(data, button) {
  var gh = sessionStorage.getItem("giohang");
  var getGioHang = JSON.parse(gh);
  getGioHang.push(data);
  sessionStorage.setItem("giohang", JSON.stringify(getGioHang));

  var gh = sessionStorage.getItem("giohang");
  var getGioHang = JSON.parse(gh);
  var countCart = $(".count-cart");
  countCart.html(getGioHang.length);
}

// hàm xử lý kg 
function handleBtnNameClick(data) {
  console.log(data);
  const vFORM_TO_OPEN = "detail.html";
  var vUrlToOpenPage = vFORM_TO_OPEN + "?id=" + data.id;
  window.location.href = vUrlToOpenPage;
}

//Hàm get Cookie đã giới thiệu ở bài trước
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

//Hàm setCookie đã giới thiệu ở bài trước
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loadCountCart() {
  var gh = sessionStorage.getItem("giohang");
  var getGioHang = JSON.parse(gh);
  var countCart = $(".count-cart");
  if(getGioHang == null) {
    countCart.html(0);
  }
  else {
    countCart.html(getGioHang.length);
  }
}
function redirectToLogin() {
  // Trước khi logout cần xóa token đã lưu trong cookie
  setCookie("token", "", 1);
  window.location.href = "signin.html";
}

function countElementOfCart(cartArr) {
  
}
