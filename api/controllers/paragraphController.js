const express = require('express');
const router = express.Router();

const Paragraph = require('../models/paragraph');
const Suggestion = require('../models/suggestion');

function getSuggestions(suggestions, paragraphId) {
    return suggestions.filter(s => {
        return s.paragraph.equals(paragraphId);
    });
}

// get all not approved paragraphs
router.get('/', (req, res) => {
    const showApproved = req.query.showApproved;

    Paragraph.find({})
        .exec((err, paragraphs) => {
            if (err) {
                console.error(err);
                return;
            }
            Suggestion.find({
                showApproved
            }).exec((err, suggestions) => {
                paragraphs.forEach(p => {
                    p.suggestions = getSuggestions(suggestions, p._id);
                });
                res.send(paragraphs);
            });
        });
});

router.delete('/:id', (req, res) => {
    res.send('paragraph is deleted');
});

module.exports = router;