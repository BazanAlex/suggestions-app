const express = require('express');
const router = express.Router();

const Paragraph = require('../models/paragraph');
const Suggestion = require('../models/suggestion');

function getSuggestions(suggestions, paragraphId) {
    console.log('suggestions', suggestions);

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
                isApproved: showApproved
            }).exec((err, suggestions) => {
                paragraphs.forEach(p => {
                    p.suggestions = getSuggestions(suggestions, p._id);
                });
                res.send(paragraphs);
            });
        });
});

router.delete('/:id', (req, res) => {
    console.log('req.query.id', req.params.id)
    Paragraph.findOneAndRemove({ _id: req.params.id },
        (err, paragraph) => {
            if (err) {
                console.error(err);
                res.status(500).send();
                return;
            }
            if (!paragraph) {
                res.status(404).send();
                return;
            }

            Suggestion.find({ paragraph: paragraph._id })
                .remove().exec((err) => {
                    if (err) {
                        console.error(err);
                    }

                    res.status(204).send();
                });
        })
});

module.exports = router;