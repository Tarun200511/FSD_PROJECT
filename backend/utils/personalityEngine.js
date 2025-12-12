// Simple rule-based engine to map personality traits to fashion styles

const personalityMappings = {
    'Introvert': {
        styles: ['minimalist', 'casual', 'classic'],
        colors: ['neutral', 'pastel', 'black', 'white', 'grey'],
        reasoning: "Based on your introverted nature, we recommend subtle, comfortable, and classic styles that don't scream for attention but exude confidence."
    },
    'Extrovert': {
        styles: ['street', 'bold', 'trendy', 'party'],
        colors: ['red', 'yellow', 'bright', 'neon', 'patterns'],
        reasoning: "Your extroverted personality shines through bold colors and trendy, statement pieces that start conversations."
    },
    'Ambivert': {
        styles: ['casual', 'chic', 'versatile'],
        colors: ['blue', 'green', 'earth tones'],
        reasoning: "As an ambivert, you value versatility. These outfits are perfect for transitioning from a quiet coffee shop to a lively social gathering."
    },
    'Creative': {
        styles: ['boho', 'artistic', 'vintage', 'layered'],
        colors: ['purple', 'orange', 'mixed'],
        reasoning: "Your creative spirit deserves outfits that are as unique as you are. We've selected artistic and expressive pieces."
    },
    'Professional': {
        styles: ['formal', 'business', 'smart-casual'],
        colors: ['navy', 'black', 'grey', 'beige'],
        reasoning: "For the professional, we recommend sharp, tailored looks that command respect and convey competence."
    },
    'Sporty': {
        styles: ['athleisure', 'sport', 'comfortable'],
        colors: ['neon', 'black', 'white'],
        reasoning: "Your active lifestyle needs functional yet stylish gear. These picks keep you moving in style."
    },
    'Minimalist': {
        styles: ['minimalist', 'clean', 'monochrome'],
        colors: ['white', 'black', 'beige', 'grey'],
        reasoning: "Less is more. These clean lines and neutral tones perfectly align with your minimalist aesthetic."
    },
    'Luxury Lover': {
        styles: ['luxury', 'elegant', 'premium'],
        colors: ['gold', 'silver', 'black', 'rich tones'],
        reasoning: "You appreciate the finer things. These premium selections offer the elegance and quality you desire."
    }
};

const getRecommendations = (personality, occasion, budget, products) => {
    const mapping = personalityMappings[personality] || personalityMappings['Ambivert']; // Default

    // Filter products based on style tags matching the personality
    let recommended = products.filter(product => {
        if (!product.tags) return false;
        return product.tags.some(tag => mapping.styles.includes(tag));
    });

    // Further filter by occasion if provided (assuming products have occasion tags, or we map styles to occasions)
    // For simplicity, we'll assume 'tags' also contain occasion keywords
    if (occasion) {
        const occasionLower = occasion.toLowerCase();
        // Boost score or filter? Let's filter loosely or sort. 
        // For this MVP, let's just ensure we don't return "party" wear for "office" if possible, 
        // but our mock data might be limited. Let's stick to style matching primarily.
    }

    // Filter by budget
    if (budget) {
        if (budget === 'Low') {
            recommended = recommended.filter(p => p.price < 50);
        } else if (budget === 'Medium') {
            recommended = recommended.filter(p => p.price >= 50 && p.price < 150);
        } else if (budget === 'Premium') {
            recommended = recommended.filter(p => p.price >= 150);
        }
    }

    // If too few results, fallback to just style matching without budget
    if (recommended.length < 3) {
        recommended = products.filter(product => {
            if (!product.tags) return false;
            return product.tags.some(tag => mapping.styles.includes(tag));
        });
    }

    // Shuffle and pick top 6
    recommended = recommended.sort(() => 0.5 - Math.random()).slice(0, 6);

    return {
        recommendations: recommended,
        reasoning: mapping.reasoning,
        styleProfile: mapping.styles.join(', ')
    };
};

module.exports = { getRecommendations };
