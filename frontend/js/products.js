const PRODUCT_API_URL = 'http://localhost:5000/api/products';

const getProducts = async () => {
    try {
        const response = await fetch(PRODUCT_API_URL);
        const products = await response.json();

        // Check for category filter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        let displayData = products;
        if (category) {
            displayData = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
            // Update page title if on category page
            const pageTitle = document.getElementById('page-title');
            if (pageTitle) pageTitle.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        }

        displayProducts(displayData);
    } catch (error) {
        console.error(error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    if (products.length === 0) {
        productList.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    productList.innerHTML = products.map(product => {
        const displayPrice = typeof formatPrice === 'function' ? formatPrice(product.price) : `$${product.price}`;
        return `
        <div class="product-card">
            <a href="product.html?id=${product._id}" style="text-decoration: none; color: inherit;">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="price">${displayPrice}</span>
                </div>
            </a>
            <div class="product-action" style="padding: 0 15px 15px;">
                <button class="btn btn-add-cart" onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        </div>
    `}).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        getProducts();
    }
});
