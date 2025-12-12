const RECOMMEND_API_URL = 'http://localhost:5000/api/recommend';

document.getElementById('personality-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const personality = document.getElementById('personality').value;
    const occasion = document.getElementById('occasion').value;
    const budget = document.getElementById('budget').value;
    const ageGroup = document.getElementById('ageGroup').value;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Curating...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(RECOMMEND_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ personality, occasion, budget, ageGroup })
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data);
        } else {
            alert('Error fetching recommendations: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
});

const displayResults = (data) => {
    const { recommendations, reasoning, styleProfile } = data;

    // Hide form, show results
    document.getElementById('form-container').style.display = 'none';
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';

    // Update Header
    document.getElementById('style-profile-title').innerText = `The ${styleProfile.split(',')[0].toUpperCase()} Edit`;
    document.getElementById('style-reasoning').innerText = `"${reasoning}"`;

    // Render Products
    const list = document.getElementById('recommendation-list');

    if (recommendations.length === 0) {
        list.innerHTML = '<p class="text-center">No matching products found for this specific combination. Try adjusting your budget.</p>';
        return;
    }

    list.innerHTML = recommendations.map(product => {
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

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
};

const resetForm = () => {
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('personality-form').reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
