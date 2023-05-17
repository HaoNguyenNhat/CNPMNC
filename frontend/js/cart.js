var check = false;

function changeVal(el) {
  var qt = parseFloat(el.parent().children(".qt").html());
  var price = parseFloat(el.parent().children(".price").html());
  var eq = Math.round(price * qt * 100) / 100;
  
  el.parent().children(".full-price").html( eq + "vnd" );
  
  changeTotal();			
}

function changeTotal() {
  
  var price = 0;
  
  $(".full-price").each(function(index){
    price += parseFloat($(".full-price").eq(index).html());
  });
  
  price = Math.round(price * 100) / 100;
  var tax = Math.round(price * 0.05 * 100) / 100
  var shipping = parseFloat($(".shipping span").html());
  var fullPrice = Math.round((price + tax + shipping) *100) / 100;
  
  if(price == 0) {
    fullPrice = 0;
  }
  
  $(".subtotal span").html(price);
  $(".tax span").html(tax);
  $(".total span").html(fullPrice);
}

function getSession() {
  var gh = sessionStorage.getItem("giohang");
  var getGioHang = JSON.parse(gh);
  return getGioHang;
}


 $(document).ready(function(){
  changeTotal();
  $(".qt-plus").click(function(){
    console.log(this.id)
    $.ajax({
      url: "http://localhost:8080/fastfood/api/noauth/product/detail/" + this.id,
      type: "GET",
      dataType: "json",
      success: function(res) {
        handleQtPlus(res);
      },
      error: function(err) {
        alert(err);
      }
    })
    $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);
    
    $(this).parent().children(".full-price").addClass("added");
    
    var el = $(this);
    window.setTimeout(function(){el.parent().children(".full-price").removeClass("added"); changeVal(el);}, 150);
    location.reload();
  });
  
  $(".qt-minus").click(function(){
    console.log(this.id);
    $.ajax({
      url: "http://localhost:8080/fastfood/api/noauth/product/detail/" + this.id,
      type: "GET",
      dataType: "json",
      success: function(res) {
        handleQtMinus(res);
      },
      error: function(err) {
        alert(err);
      }
    })
    child = $(this).parent().children(".qt");
    
    if(parseInt(child.html()) > 1) {
      child.html(parseInt(child.html()) - 1);
    }
    else if(parseInt(child.html()) == 1) {
      var arrayCart = getSession();
      arrayCart.splice(this.id, 1);
      sessionStorage.setItem("giohang", JSON.stringify(arrayCart));
      window.setTimeout(
        function(){
          el.parent().parent().slideUp('fast', function() { 
            el.parent().parent().remove(); 
            if($(".product").length == 0) {
              if(check) {
                $("#cart").html("<h1>Cảm ơn bạn đã đặt món ở cửa hàng chúng tôi !</p>");
              } else {
                $("#cart").html("<h1>Không có sản phẩm !</h1>");
              }
            }
            changeTotal(); 
          });
        }, 200);
    }
    $(this).parent().children(".full-price").addClass("minused");
    
    var el = $(this);
    window.setTimeout(function(){el.parent().children(".full-price").removeClass("minused"); changeVal(el);}, 150);
    location.reload();
  });
  
  window.setTimeout(function(){$(".is-open").removeClass("is-open")}, 1200);
  
  $(".btn1").click(function(){
    window.location.href="payment.html"
  });
});




function handleQtPlus(res) {
  var gh = sessionStorage.getItem("giohang");
  var getGioHang = JSON.parse(gh);
  getGioHang.push(res);

  sessionStorage.setItem("giohang", JSON.stringify(getGioHang));

}

function handleQtMinus(res) {
  var gh = sessionStorage.getItem("giohang");
  var getGioHang = JSON.parse(gh);
  for (var i = getGioHang.length - 1; i >= 0; --i) {
    if (getGioHang[i].id == res.id) {
      getGioHang.splice(i,1);
        break;
    }
   }

  sessionStorage.setItem("giohang", JSON.stringify(getGioHang));
}

let getGioHang = getSession("giohang");

const convert = (getGioHang) => {
  const res = {};
  getGioHang.forEach((obj) => {
     const key = `${obj.id}`;
     if (!res[key]) {
        res[key] = { ...obj, count: 0 };
     };
     res[key].count += 1;
  });
return Object.values(res);
};
for(var i = 0; i < convert(getGioHang).length; i ++) {
  $("#cart").append(`<article class="product">
                      <header>
                          <a class="remove">
                              <img src="images/${convert(getGioHang)[i].photo1}" alt="">
                          </a>
                      </header>
                      <div class="content">
                          <h1>${convert(getGioHang)[i].productName}</h1>
                          ${convert(getGioHang)[i].productDescription}
                      </div>
                      <footer class="content">
                          <span id="${convert(getGioHang)[i].id}" class="qt-minus">-</span>
                          <span class="qt">${convert(getGioHang)[i].count}</span>
                          <span class="qt-plus" id="${convert(getGioHang)[i].id}">+</span>
                          <h2 class="full-price">
                          ${convert(getGioHang)[i].buyPrice*convert(getGioHang)[i].count}vnd
                          </h2>
                          <h2 class="price">
                          ${convert(getGioHang)[i].buyPrice}vnd
                          </h2>
                      </footer>
  </article>`)
}
