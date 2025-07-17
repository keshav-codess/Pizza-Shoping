import productOperations from "../services/product-operations.js";

async function loadPizzas() {
    const pizzas = await productOperations.loadProducts();
    for (let pizza of pizzas) {
        preparePizzaCard(pizza);
    }
}

function addToCart() {
    const currentButton = this;
    const pizzaid = parseInt(currentButton.getAttribute('product-id'));
    const product = productOperations.search(pizzaid);
    if (product) {
        product.qty = (product.qty || 0) + 1;
        printBasket();
    } else {
        console.warn('Pizza not found for ID:', pizzaid);
    }
}

function removeFromCart(event) {
    const productId = parseInt(event.currentTarget.getAttribute('data-id'));
    const product = productOperations.search(productId);
    if (product && product.qty > 0) {
        product.qty--;
        printBasket();
    }
}

function printBasket() {
    const cartProducts = productOperations.getProductsIncart();
    const basket = document.querySelector('#basket-list');
    const totalSpan = document.querySelector('#total');

    basket.innerHTML = '';
    let total = 0;

    for (let product of cartProducts) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const itemTotal = product.price * product.qty;
        total += itemTotal;

        li.innerHTML = `
            <span>${product.name} × ${product.qty}</span>
            <span>
                ₹${itemTotal.toFixed(2)}
                <button class="btn btn-sm btn-outline-danger ms-2 remove-btn" data-id="${product.id}">
                    <i class="bi bi-trash3"></i>
                </button>
            </span>
        `;

        basket.appendChild(li);
    }

    totalSpan.innerText = total.toFixed(2);

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#output');

    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-md-6 col-lg-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card shadow-sm';
    cardDiv.style.width = "100%";
    colDiv.appendChild(cardDiv);

    const img = document.createElement('img');
    img.loading = 'lazy'; 
    img.src = pizza.url;
    img.className = 'card-img-top';
    img.alt = pizza.name;
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;

    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;

    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);
    button.className = 'btn btn-danger';
    button.innerHTML = `<i class="bi bi-cart-plus"></i> Add to Cart`;

    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);

    outputDiv.appendChild(colDiv);
}

function handleSort(sortType) {
    if (sortType === 'price') {
        productOperations.products.sort((a, b) => a.price - b.price);
    } else if (sortType === 'name') {
        productOperations.products.sort((a, b) => a.name.localeCompare(b.name));
    }

    const outputDiv = document.querySelector('#output');
    outputDiv.innerHTML = '';

    for (let pizza of productOperations.products) {
        preparePizzaCard(pizza);
    }
}

document.addEventListener('DOMContentLoaded', loadPizzas);
window.handleSort = handleSort;
