let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price: parseFloat(price), quantity: 1 });
  }
  saveCart();
  updateCartCount();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCart();
}

function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceSpan = document.getElementById('total-price');

  if (!cartItemsDiv || !totalPriceSpan) return;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Ваш кошик порожній</p>';
    totalPriceSpan.textContent = '0 грн';
    updateCartCount();
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = '';

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} грн</span>
      <span>
        <button onclick="changeQuantity(${index}, -1)">−</button>
        ${item.quantity}
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">🗑️</button>
      </span>
    `;

    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalPriceSpan.textContent = total.toFixed(2) + ' грн';
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      addToCart(id, name, price);
    });
  });

  const cartModal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');

  if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
      cartModal.style.display = 'flex';
      updateCart();
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'с') {
      cartModal.style.display = 'flex';
      updateCart();
    }
  });

  updateCartCount();
  updateCart(); // ОНОВЛЮЄМО ВІДОБРАЖЕННЯ КОШИКА одразу при завантаженні сторінки
});
