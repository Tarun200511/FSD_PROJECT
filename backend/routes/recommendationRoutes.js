const express = require('express');
const router = express.Router();
const { recommendProducts } = require('../controllers/recommendationController');

router.post('/', recommendProducts);

module.exports = router;
