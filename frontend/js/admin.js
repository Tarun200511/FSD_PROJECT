const loadAdminData = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.isAdmin) {
        window.location.href = 'login.html';
        return;
    }

    // Load Products
    try {
        const resProducts = await fetch('http://localhost:5000/api/products');
        const products = await resProducts.json();

        const productList = document.getElementById('admin-product-list');
        productList.innerHTML = products.map(product => `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px;">${product._id}</td>
                <td style="padding: 10px;">${product.name}</td>
                <td style="padding: 10px;">$${product.price}</td>
                <td style="padding: 10px;">${product.category}</td>
                <td style="padding: 10px;">${product.brand}</td>
                <td style="padding: 10px;">
                    <button onclick="deleteProductHandler('${product._id}')" style="background: #ff7675; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error(error);
    }

    // Load Orders
    try {
        const resOrders = await fetch('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${userInfo.token}` }
        });
        const orders = await resOrders.json();

        const orderList = document.getElementById('admin-order-list');
        orderList.innerHTML = orders.map(order => `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px;">${order._id}</td>
                <td style="padding: 10px;">${order.user && order.user.name}</td>
                <td style="padding: 10px;">${order.createdAt.substring(0, 10)}</td>
                <td style="padding: 10px;">$${order.totalPrice}</td>
                <td style="padding: 10px;">${order.isPaid ? 'Yes' : 'No'}</td>
                <td style="padding: 10px;">${order.isDelivered ? 'Yes' : 'No'}</td>
                <td style="padding: 10px;">
                    <a href="#" style="color: var(--primary-color);">Details</a>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error(error);
    }
};

const createProductHandler = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (confirm('Are you sure you want to create a new product?')) {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });
            if (response.ok) {
                alert('Product created');
                loadAdminData();
            }
        } catch (error) {
            console.error(error);
        }
    }
};

const deleteProductHandler = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (confirm('Are you sure?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });
            if (response.ok) {
                alert('Product deleted');
                loadAdminData();
            }
        } catch (error) {
            console.error(error);
        }
    }
};

document.addEventListener('DOMContentLoaded', loadAdminData);
