const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // check for existing paragraph
    // if no, create one with the same articleUrl and OriginalText
    // else push to existing one

    res.send('Suggestion is created');
});

module.exports = router;