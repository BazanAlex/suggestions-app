const express = require('express');
const router = express.Router();

const Suggestion = require('../models/suggestion');
const Paragraph = require('../models/paragraph');

function saveSuggestion(req, res, paragraphId) {
    const body = req.body;
    console.log('body for suggestion', body);

    const itemToSave = new Suggestion({
        articleUrl: body.articleUrl,
        originalText: body.originalText,
        usersText: body.usersText,
        isApproved: false,
        paragraph: paragraphId
    });

    itemToSave.save((err, saved) => {
        if (err) {
            console.error(err);
        }

        res.send(saved);
    });
}

function saveParagraph(req, res, callback) {
    const body = req.body;

    const paragraphToSave = new Paragraph({
        articleUrl: body.articleUrl,
        originalText: body.originalText
    });

    paragraphToSave.save((err, saved) => {
        if (err) {
            console.err(err);
        }
        console.log('paragraph saved', saved);

        callback(req, res, saved);
    });
}

router.post('/', (req, res) => {
    const body = req.body;

    Paragraph
        .findOne({
            articleUrl: body.articleUrl,
            originalText: body.originalText
        }).exec((err, paragraph) => {
            if (err) {
                console.error(err);
                return;
            }

            if (paragraph) {
                saveSuggestion(req, res, paragraph._id);
            } else {
                saveParagraph(req, res, (req, res, paragraph) => {
                    saveSuggestion(req, res, paragraph._id);
                });
            }
        });
});

router.patch('/:id', (req, res) => {
    const body = req.body;

    const updateObj = {};

    if (body.isApproved != undefined) {
        updateObj.isApproved = body.isApproved;
    }

    Suggestion
        .findByIdAndUpdate(req.params.id, 
            updateObj,
            { new: true },
            (err, updated) => {
                if (err) {
                    res.status(500).send();
                    return;
                }

                if (!updated) {
                    res.status(404).send();
                    return;
                }

                res.send(updated);
        });
});

module.exports = router;