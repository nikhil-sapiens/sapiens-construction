const products = [
    { id: 'cement', name: 'Cement', price: 300 },
    { id: 'rebar', name: 'Rebar', price: 100 },
    { id: 'bricks', name: 'Bricks', price: 3000 },
    { id: 'aggregate', name: 'Aggregate', price: 2900 },
    { id: 'black-river-sand', name: 'Black River Sand', price: 1900 },
    { id: 'coarse-river-sand', name: 'Coarse River Sand', price: 1900 },
    { id: 'worker', name: 'Worker', price: 70 },
    { id: 'white-floor-tiles', name: 'White Floor Tiles', price: 500 },
    { id: 'paint', name: 'Paint', price: 600 }
];

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function findProduct(productId) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            return products[i];
        }
    }

    return null;
}

function addToCart(productId) {
    let product = findProduct(productId);
    let button = document.querySelector("[onclick=\"addToCart('" + productId + "');\"]");

    if (product === null || button === null) {
        return;
    }

    let box = button.parentElement;
    let input = box.querySelector('.product-quantity');

    if (input === null) {
        return;
    }

    let quantity = Number(input.value);

    if (Number.isFinite(quantity) === false || quantity <= 0) {
        return;
    }

    let cart = getCart();
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + quantity;
            cart[i].price = product.price;
            cart[i].cost = cart[i].quantity * product.price;
            found = true;
            break;
        }
    }

    if (found === false) {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            cost: quantity * product.price
        });
    }

    saveCart(cart);
    input.value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    let inputs = document.querySelectorAll('.product input');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains('product-quantity') === false) {
            inputs[i].classList.add('product-quantity');
        }
    }
});
