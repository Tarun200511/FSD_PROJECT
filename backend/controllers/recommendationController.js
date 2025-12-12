const { getRecommendations } = require('../utils/personalityEngine');
const { getProductsArray } = require('./productController'); // We need to access the mock data

// @desc    Get product recommendations based on personality
// @route   POST /api/recommend
// @access  Public
const recommendProducts = async (req, res) => {
    const { personality, ageGroup, gender, occasion, budget } = req.body;

    if (!personality) {
        return res.status(400).json({ message: 'Personality type is required' });
    }

    try {
        // Get all products (using the mock data source)
        const products = await getProductsArray();

        const result = getRecommendations(personality, occasion, budget, products);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { recommendProducts };
