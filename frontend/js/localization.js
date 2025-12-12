const translations = {
    en: {
        'nav-shop-all': 'Shop All',
        'nav-clothing': 'Clothing',
        'nav-accessories': 'Accessories',
        'nav-home': 'Home',
        'nav-cart': 'Cart',
        'nav-login': 'Login',
        'hero-label': 'NEW COLLECTION 2024',
        'hero-title-1': 'Timeless Design',
        'hero-title-2': 'for Modern Living',
        'hero-desc': 'Discover our curated collection of essentials crafted for everyday elegance and lasting quality.',
        'btn-shop': 'Shop Collection',
        'btn-new': 'View New Arrivals',
        'latest-arrivals': 'Latest Arrivals',
        'filter-all': 'All',
        'filter-clothing': 'Clothing',
        'filter-accessories': 'Accessories',
        'filter-home': 'Home',
        'footer-tagline': 'Timeless design for modern living.',
        'footer-shop': 'Shop',
        'footer-support': 'Support',
        'footer-copy': '© 2024 Maison. All rights reserved.'
    },
    kn: {
        'nav-shop-all': 'ಎಲ್ಲವನ್ನೂ ಖರೀದಿಸಿ',
        'nav-clothing': 'ಬಟ್ಟೆಗಳು',
        'nav-accessories': 'ಪರಿಕರಗಳು',
        'nav-home': 'ಮನೆ',
        'nav-cart': 'ಕಾರ್ಟ್',
        'nav-login': 'ಲಾಗಿನ್',
        'hero-label': 'ಹೊಸ ಸಂಗ್ರಹ 2024',
        'hero-title-1': 'ಶಾಶ್ವತ ವಿನ್ಯಾಸ',
        'hero-title-2': 'ಆಧುನಿಕ ಜೀವನಕ್ಕಾಗಿ',
        'hero-desc': 'ದೈನಂದಿನ ಸೊಬಗು ಮತ್ತು ಬಾಳಿಕೆ ಬರುವ ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ರಚಿಸಲಾದ ನಮ್ಮ ಸಂಗ್ರಹವನ್ನು ಅನ್ವೇಷಿಸಿ.',
        'btn-shop': 'ಸಂಗ್ರಹವನ್ನು ಖರೀದಿಸಿ',
        'btn-new': 'ಹೊಸ ಆಗಮನಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        'latest-arrivals': 'ಇತ್ತೀಚಿನ ಆಗಮನಗಳು',
        'filter-all': 'ಎಲ್ಲಾ',
        'filter-clothing': 'ಬಟ್ಟೆಗಳು',
        'filter-accessories': 'ಪರಿಕರಗಳು',
        'filter-home': 'ಮನೆ',
        'footer-tagline': 'ಆಧುನಿಕ ಜೀವನಕ್ಕಾಗಿ ಶಾಶ್ವತ ವಿನ್ಯಾಸ.',
        'footer-shop': 'ಅಂಗಡಿ',
        'footer-support': 'ಬೆಂಬಲ',
        'footer-copy': '© 2024 Maison. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
    }
};

let currentLang = 'en';
let currentCurrency = 'USD';
const exchangeRate = 83.00; // 1 USD = 83 INR

const toggleLanguage = () => {
    currentLang = currentLang === 'en' ? 'kn' : 'en';
    document.getElementById('lang-btn').innerText = currentLang === 'en' ? 'KN' : 'EN';
    applyTranslations();
};

const toggleCurrency = () => {
    currentCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
    document.getElementById('curr-btn').innerText = currentCurrency;
    updateProductPrices();
};

const applyTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
};

const formatPrice = (price) => {
    if (currentCurrency === 'INR') {
        return `₹${(price * exchangeRate).toFixed(2)}`;
    }
    return `$${price.toFixed(2)}`;
};

const updateProductPrices = () => {
    // Re-render products with new currency
    if (typeof getProducts === 'function') {
        getProducts(); // This will re-fetch (or re-use cached) and re-render
    }
};

// Hook into product display to use formatPrice
// We need to modify products.js to use this formatPrice function if available
