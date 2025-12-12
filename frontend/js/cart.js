const addToCart = (id, name, price, image, quantity = 1) => {
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    const existItem = cartItems.find(x => x.product === id);

    if (existItem) {
        cartItems = cartItems.map(x => x.product === existItem.product ? { ...x, qty: x.qty + quantity } : x);
    } else {
        cartItems.push({ product: id, name, price, image, qty: quantity });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    alert('Product added to cart');
};

const updateCartCount = () => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cartItems.reduce((acc, item) => acc + item.qty, 0);
    }
};

document.addEventListener('DOMContentLoaded', updateCartCount);
