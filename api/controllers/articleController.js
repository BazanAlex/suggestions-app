const express = require('express');
const router = express.Router()
const request = require('request');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    const url = req.query.articleUrl;

    if (!url) {
        res.status(400).send(); // bad request
        return;
    }

    request(url, (error, response, body) => {
        if (error || !response) {
            res.status(500).send();
            return;
        }

        const $ = cheerio.load(body);
        const rootOfSearch = $('article.article-entity');

        const paragraphs = rootOfSearch.find('p');
        const paragraphContents = [];

        paragraphs.each((i, el) => {
            paragraphContents.push($(el).text());
        });

        const title = rootOfSearch.find('h2.headline').text();

        res.send({
            title,
            paragraphContents
        });
    })
});

module.exports = router;