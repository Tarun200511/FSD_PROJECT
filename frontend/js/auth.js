const API_URL = 'http://localhost:5000/api/auth';

const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred');
    }
};

const register = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred');
    }
};

const logout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = 'login.html';
};

const checkAuth = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const authLinks = document.getElementById('auth-links');
    if (userInfo) {
        authLinks.innerHTML = `
            <a href="profile.html">${userInfo.name}</a>
            ${userInfo.isAdmin ? '<a href="admin.html">Admin</a>' : ''}
            <a href="#" onclick="logout()">Logout</a>
        `;
    }
};

document.addEventListener('DOMContentLoaded', checkAuth);
