const API_URL = 'https://fakestoreapi.com/products';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout');

fetch(API_URL)
  .then(res => res.json())
  .then(data => renderProducts(data));

function renderProducts(products) {
  productList.innerHTML = '';
  products.slice(0, 6).forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'card p-3';
    card.innerHTML = `
      <h5 class="text-center">Juego ${index + 1}</h5>
      <img src="img/Imagen0${index + 1}.png" alt="Videojuego" class="img-fluid mb-2" />
      <p>Videojuego increíble con horas de diversión.</p>
      <p><strong>$${product.price}</strong></p>
      <button class="btn btn-success w-100"
        onclick="addToCart(${product.id}, ${product.price})">
        Agregar al carrito
      </button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id, price) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, price, qty: 1 });
  }
  updateCart();
}

function removeOne(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }
  updateCart();
}

function removeAll(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>Producto ${item.id} | $${item.price} x ${item.qty}</span>
      <div>
        <button class="btn btn-sm btn-warning me-1"
          onclick="removeOne(${item.id})">➖</button>
        <button class="btn btn-sm btn-danger"
          onclick="removeAll(${item.id})">❌</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;
  localStorage.setItem('cart', JSON.stringify(cart));
}

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  alert('¡Compra realizada con éxito! 🎉');
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
});

updateCart();
