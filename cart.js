// Ініціалізація кошика
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Оновлення кількості товарів у кошику на навігаційній панелі
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Додавання товару в кошик
function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Видалення товару з кошика
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Виведення товарів у кошику
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваш кошик порожній</p>';
    } else {
        let totalPrice = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            totalPrice += item.price;
            return `
                <div class="cart-item">
                    <span>${item.name}</span> - <span>${item.price} грн</span>
                    <button onclick="removeFromCart('${item.id}')">Видалити</button>
                </div>
            `;
        }).join('');
        document.getElementById('total-price').innerText = totalPrice + ' грн';
    }
}

// Ініціалізація сторінки кошика
if (document.getElementById('cart-items')) {
    displayCartItems();
}

// Обробка додавання в кошик через кнопки на головній сторінці
if (document.querySelectorAll('.add-to-cart')) {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });
}

// Оформлення замовлення
document.getElementById('checkout')?.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Ваш кошик порожній!');
    } else {
        alert('Ваше замовлення оформлено!');
        localStorage.removeItem('cart');
        cart = [];
        displayCartItems();
        updateCartCount();
    }
});
