const PRODUCT_API_URL = 'http://localhost:5000/api/products';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetails(productId);
    } else {
        window.location.href = 'index.html';
    }
});

const fetchProductDetails = async (id) => {
    try {
        // Fetch all products first to find the specific one (since we are using mock data array in backend)
        // In a real API, we would fetch /api/products/:id
        const response = await fetch(PRODUCT_API_URL);
        const products = await response.json();
        const product = products.find(p => p._id === id);

        if (product) {
            renderProductDetails(product);
            renderRelatedProducts(products, product.category, product._id);
        } else {
            document.querySelector('.product-details-container').innerHTML = '<p>Product not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

const renderProductDetails = (product) => {
    // Breadcrumbs
    document.getElementById('breadcrumb-category').innerText = product.category;
    document.getElementById('breadcrumb-category').href = `category.html?category=${product.category}`;
    document.getElementById('breadcrumb-name').innerText = product.name;

    // Images
    const mainImg = document.getElementById('main-img');
    mainImg.src = product.image;
    mainImg.alt = product.name;

    // Info
    document.getElementById('product-brand').innerText = product.brand;
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-desc').innerText = product.description;

    // Price
    const displayPrice = typeof formatPrice === 'function' ? formatPrice(product.price) : `$${product.price}`;
    document.getElementById('product-price').innerText = displayPrice;

    // Add to Cart Button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.onclick = () => {
        const qty = parseInt(document.getElementById('qty').value);
        addToCart(product._id, product.name, product.price, product.image, qty);
    };
};

const renderRelatedProducts = (allProducts, category, currentId) => {
    const relatedList = document.getElementById('related-product-list');
    if (!relatedList) return;

    // Filter products in same category, exclude current product, limit to 4
    const related = allProducts
        .filter(p => p.category === category && p._id !== currentId)
        .slice(0, 4);

    if (related.length === 0) {
        document.querySelector('.related-products').style.display = 'none';
        return;
    }

    relatedList.innerHTML = related.map(product => {
        const displayPrice = typeof formatPrice === 'function' ? formatPrice(product.price) : `$${product.price}`;
        return `
        <div class="product-card" onclick="window.location.href='product.html?id=${product._id}'" style="cursor: pointer;">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">${displayPrice}</span>
            </div>
        </div>
    `}).join('');
};

// Quantity Selectors
const increaseQty = () => {
    const qtyInput = document.getElementById('qty');
    let val = parseInt(qtyInput.value);
    qtyInput.value = val + 1;
};

const decreaseQty = () => {
    const qtyInput = document.getElementById('qty');
    let val = parseInt(qtyInput.value);
    if (val > 1) {
        qtyInput.value = val - 1;
    }
};

// Override addToCart from cart.js to support quantity if needed,
// but cart.js addToCart logic might need a small tweak to accept quantity or we loop calls.
// Checking cart.js: it pushes {qty: 1}. Let's update cart.js to accept qty or handle it here.
// For now, let's assume we modify cart.js slightly or just push multiple times?
// Better to update cart.js to accept qty.
