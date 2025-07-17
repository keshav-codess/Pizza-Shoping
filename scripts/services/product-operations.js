import Product from '../models/products.js';
import doNetworkCall from './api-client.js';

const productOperations = {
    products: [],

    // Search product and mark it added to cart
    search(pizzaid) {
        const product = this.products.find(currentProduct => currentProduct.id === pizzaid);
        console.log('Product Found:', product);
        return product;
    },

    // Get all products added to cart
    getProductsIncart() {
        const productInBasket = this.products.filter(product => product.qty > 0);
        return productInBasket;
    },

    async loadProducts() {
        const pizzas = await doNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productArray = pizzaArray.map(pizza => {
            const currentPizza = new Product(
                pizza.id,
                pizza.name,
                pizza.menu_description,
                pizza.price,
                pizza.assets.product_details_page[0].url
            );
            return currentPizza;
        });
        console.log('Product Array', productArray);
        this.products = productArray;
        return productArray;
    },

    sortProductsByPrice() {
        this.products.sort((a, b) => a.price - b.price);
    },

    sortProductsByName() {
        this.products.sort((a, b) => a.name.localeCompare(b.name));
    }
};

export default productOperations;
