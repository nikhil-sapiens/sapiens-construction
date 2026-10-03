function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getItemPrice(item) {
    if (item.price) {
        return item.price;
    }

    if (item.cost && item.quantity) {
        return item.cost / item.quantity;
    }

    return 0;
}

function removeFromCart(productId, quantity = 1) {
    let cart = getCart();
    let index = -1;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        return;
    }

    let item = cart[index];
    let amount = Number(quantity) || 1;

    if (amount <= 0) {
        return;
    }

    item.quantity = item.quantity - amount;

    if (item.quantity <= 0) {
        cart.splice(index, 1);
    } else {
        let price = getItemPrice(item);
        item.price = price;
        item.cost = item.quantity * price;
    }

    saveCart(cart);
    renderCart();
}

function clearCart() {
    saveCart([]);
    renderCart();
}

function renderCart() {
    let box = document.querySelector('.my-cart');

    if (box === null) {
        return;
    }

    let cart = getCart();
    box.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        box.textContent = 'Your cart is empty.';
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let row = document.createElement('div');
        row.className = 'cart-item';

        let info = document.createElement('div');
        info.textContent = item.name + ': ' + item.quantity + ' - ' + item.cost;

        let buttons = document.createElement('div');
        buttons.className = 'cart-actions';

        let removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = item.quantity > 1 ? 'Remove one' : 'Remove';
        removeButton.addEventListener('click', function () {
            removeFromCart(item.id, 1);
        });

        let removeAll = document.createElement('button');
        removeAll.type = 'button';
        removeAll.textContent = 'Remove all';
        removeAll.addEventListener('click', function () {
            removeFromCart(item.id, item.quantity);
        });

        buttons.appendChild(removeButton);
        buttons.appendChild(removeAll);
        row.appendChild(info);
        row.appendChild(buttons);
        box.appendChild(row);
        total += item.cost;
    }

    let totalRow = document.createElement('div');
    totalRow.className = 'total';
    totalRow.textContent = 'Total cost: ' + total;
    box.appendChild(totalRow);
}

document.addEventListener('DOMContentLoaded', renderCart);
