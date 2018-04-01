const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // also check for showApproved
    res.send('got list of paragraphs');
});

router.delete('/:id', (req, res) => {
    res.send('paragraph is deleted');
});

module.exports = router;