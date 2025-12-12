const mongoose = require('mongoose');

const personalityRuleSchema = mongoose.Schema({
    personalityType: {
        type: String,
        required: true,
        unique: true
    },
    styles: [{
        type: String
    }],
    colors: [{
        type: String
    }],
    description: {
        type: String
    }
}, {
    timestamps: true
});

const PersonalityRule = mongoose.model('PersonalityRule', personalityRuleSchema);

module.exports = PersonalityRule;
