const Product = require('../models/Product');

// Mock Data for Demo with Tags for Recommender
const mockProducts = [
    // Electronics
    { _id: '1', name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', description: 'High quality wireless headphones.', brand: 'Sony', category: 'Electronics', price: 89.99, countInStock: 10, rating: 4.5, numReviews: 12, tags: ['tech', 'modern', 'minimalist'] },
    { _id: '2', name: 'Smart Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60', description: 'Track your fitness with style.', brand: 'Apple', category: 'Electronics', price: 199.99, countInStock: 7, rating: 4.0, numReviews: 8, tags: ['tech', 'sport', 'modern'] },
    { _id: '3', name: 'Digital Camera', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', description: 'Capture your moments.', brand: 'Canon', category: 'Electronics', price: 499.99, countInStock: 11, rating: 5, numReviews: 12, tags: ['tech', 'creative', 'artistic'] },
    { _id: '4', name: 'Gaming Mouse', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60', description: 'Precision gaming mouse.', brand: 'Logitech', category: 'Electronics', price: 49.99, countInStock: 7, rating: 3.5, numReviews: 10, tags: ['tech', 'gaming'] },
    { _id: '5', name: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&auto=format&fit=crop&q=60', description: 'Clicky mechanical keyboard.', brand: 'Razer', category: 'Electronics', price: 99.99, countInStock: 0, rating: 4, numReviews: 12, tags: ['tech', 'gaming'] },

    // Clothing (30 items)
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `c${i + 1}`,
        name: `Classic T-Shirt ${i + 1}`,
        image: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60`,
        description: 'Comfortable cotton t-shirt.',
        brand: 'Uniqlo',
        category: 'Clothing',
        price: 19.99 + i,
        countInStock: 20,
        rating: 4.5,
        numReviews: 10,
        tags: ['casual', 'minimalist', 'comfortable']
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `c${i + 11}`,
        name: `Bold Print Shirt ${i + 1}`,
        image: `https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60`,
        description: 'Stand out with this bold print.',
        brand: 'Zara',
        category: 'Clothing',
        price: 39.99 + i,
        countInStock: 20,
        rating: 4.5,
        numReviews: 10,
        tags: ['bold', 'street', 'party', 'trendy']
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `c${i + 21}`,
        name: `Formal Blazer ${i + 1}`,
        image: `https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60`,
        description: 'Sharp blazer for work.',
        brand: 'Hugo Boss',
        category: 'Clothing',
        price: 129.99 + i,
        countInStock: 20,
        rating: 4.5,
        numReviews: 10,
        tags: ['formal', 'business', 'smart-casual', 'premium']
    })),

    { _id: 'c31', name: 'Denim Jacket', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=60', description: 'Classic denim jacket.', brand: 'Levis', category: 'Clothing', price: 79.99, countInStock: 7, rating: 4.0, numReviews: 8, tags: ['casual', 'street', 'vintage'] },
    { _id: 'c32', name: 'Summer Dress', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60', description: 'Light and breezy summer dress.', brand: 'Zara', category: 'Clothing', price: 49.99, countInStock: 15, rating: 4.8, numReviews: 20, tags: ['casual', 'chic', 'boho'] },
    { _id: 'c33', name: 'Men\'s Suit', image: 'https://images.unsplash.com/photo-1594938298603-c8148c472997?w=500&auto=format&fit=crop&q=60', description: 'Sharp looking suit.', brand: 'Hugo Boss', category: 'Clothing', price: 299.99, countInStock: 5, rating: 5.0, numReviews: 5, tags: ['formal', 'business', 'luxury'] },

    // Accessories (30 items)
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `a${i + 1}`,
        name: `Minimalist Watch ${i + 1}`,
        image: `https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60`,
        description: 'Clean design watch.',
        brand: 'Generic',
        category: 'Accessories',
        price: 129.99 + i,
        countInStock: 15,
        rating: 4.2,
        numReviews: 8,
        tags: ['minimalist', 'formal', 'premium']
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `a${i + 11}`,
        name: `Statement Necklace ${i + 1}`,
        image: `https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=500&auto=format&fit=crop&q=60`,
        description: 'Bold necklace.',
        brand: 'Generic',
        category: 'Accessories',
        price: 29.99 + i,
        countInStock: 15,
        rating: 4.2,
        numReviews: 8,
        tags: ['bold', 'party', 'artistic']
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        _id: `a${i + 21}`,
        name: `Leather Bag ${i + 1}`,
        image: `https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60`,
        description: 'Premium leather bag.',
        brand: 'Generic',
        category: 'Accessories',
        price: 89.99 + i,
        countInStock: 15,
        rating: 4.2,
        numReviews: 8,
        tags: ['classic', 'formal', 'luxury']
    })),

    { _id: 'a31', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60', description: 'Stylish sunglasses.', brand: 'RayBan', category: 'Accessories', price: 150.00, countInStock: 10, rating: 4.5, numReviews: 12, tags: ['chic', 'street', 'summer'] },
    { _id: 'a32', name: 'Leather Bag', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60', description: 'Premium leather bag.', brand: 'Gucci', category: 'Accessories', price: 250.00, countInStock: 0, rating: 4, numReviews: 12, tags: ['luxury', 'formal', 'classic'] },
    { _id: 'a33', name: 'Wrist Watch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60', description: 'Elegant wrist watch.', brand: 'Rolex', category: 'Accessories', price: 5000.00, countInStock: 10, rating: 4.5, numReviews: 12, tags: ['luxury', 'premium', 'formal'] },

    // Home (30 items)
    ...Array.from({ length: 30 }, (_, i) => ({
        _id: `h${i + 1}`,
        name: `Home Decor ${i + 1}`,
        image: `https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60`,
        description: 'Beautiful home decoration.',
        brand: 'HomeGoods',
        category: 'Home',
        price: 39.99 + i,
        countInStock: 12,
        rating: 4.0,
        numReviews: 15,
        tags: ['home', 'decor']
    })),
    { _id: 'h31', name: 'Coffee Maker', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60', description: 'Brew perfect coffee.', brand: 'Nespresso', category: 'Home', price: 149.99, countInStock: 5, rating: 5, numReviews: 12, tags: ['home', 'kitchen'] },
    { _id: 'h32', name: 'Desk Lamp', image: 'https://images.unsplash.com/photo-1507473888900-52e1adad5452?w=500&auto=format&fit=crop&q=60', description: 'Modern desk lamp.', brand: 'Ikea', category: 'Home', price: 29.99, countInStock: 11, rating: 5, numReviews: 12, tags: ['home', 'office'] },
    { _id: 'h33', name: 'Plant Pot', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60', description: 'Ceramic plant pot.', brand: 'HomeDepot', category: 'Home', price: 19.99, countInStock: 7, rating: 3.5, numReviews: 10, tags: ['home', 'garden'] },
    { _id: 'h34', name: 'Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60', description: 'Comfortable sofa.', brand: 'Ashley', category: 'Home', price: 899.99, countInStock: 0, rating: 4, numReviews: 12, tags: ['home', 'living'] },
    { _id: 'h35', name: 'Bookshelf', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&auto=format&fit=crop&q=60', description: 'Wooden bookshelf.', brand: 'Ikea', category: 'Home', price: 120.00, countInStock: 10, rating: 4.5, numReviews: 12, tags: ['home', 'office'] }
];

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    res.json(mockProducts);
};

// Helper to get products array for other controllers
const getProductsArray = async () => {
    return mockProducts;
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = mockProducts.find(p => p._id === req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    // Mock delete
    res.json({ message: 'Product removed' });
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    // Mock create
    res.status(201).json({ message: 'Product created' });
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    // Mock update
    res.json({ message: 'Product updated' });
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getProductsArray // Exporting this for recommendationController
};
