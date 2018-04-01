const express = require('express');
const router = express.Router();

router.use('/article', require('./articleController'));
router.use('/suggestion', require('./suggestionController'));
router.use('/paragraph', require('./paragraphController'));

module.exports = router;