const express = require('express');
const router = express.Router();

router.get('/:url', (req, res) => {
    res.send('parsing article and returning');
});

module.exports = router;