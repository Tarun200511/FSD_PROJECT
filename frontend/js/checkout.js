const API_ORDER_URL = 'http://localhost:5000/api/orders';

const calculatePrices = () => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    document.getElementById('items-price').innerText = itemsPrice.toFixed(2);
    document.getElementById('shipping-price').innerText = shippingPrice.toFixed(2);
    document.getElementById('tax-price').innerText = taxPrice.toFixed(2);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);

    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const placeOrder = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        window.location.href = 'login.html';
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (!cartItems || cartItems.length === 0) {
        alert('Cart is empty');
        return;
    }

    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const country = document.getElementById('country').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices();

    const orderData = {
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    };

    try {
        const response = await fetch(API_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('Order Placed Successfully!');
            localStorage.removeItem('cartItems');
            window.location.href = 'index.html';
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    calculatePrices();
    document.getElementById('checkout-form').addEventListener('submit', placeOrder);
});
