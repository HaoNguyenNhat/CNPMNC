// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
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
});

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
const cart = document.getElementById('cart');
const cartItems = cart.querySelector('ul');
const cartTotal = document.getElementById('total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let items = [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(name, price) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.name === name) {
      item.quantity++;
      updateCart();
      return;
    }
  }
  items.push({ name, price, quantity: 1 });
  updateCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(name) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.name === name) {
      item.quantity--;
      if (item.quantity === 0) {
        items.splice(i, 1);
      }
      updateCart();
      return;
    }
  }
}

// Cập nhật giỏ hàng
function updateCart() {
  cartItems.innerHTML = '';
  let totalPrice = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const li = document.createElement('li');
    li.innerText = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => {
      removeFromCart(item.name);
    });
    li.appendChild(removeButton);
    cartItems.appendChild(li);
    totalPrice += item.price * item.quantity;
  }
  cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
  }
  
  // Thêm sự kiện click cho nút "Add to Cart"
  addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
  const name = button.getAttribute('data-name');
  const price = button.getAttribute('data-price');
  addToCart(name, price);
  });
  });