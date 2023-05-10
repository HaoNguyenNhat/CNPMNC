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