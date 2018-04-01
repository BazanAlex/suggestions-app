const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParagraphSchema = Schema({
    articleUrl: String,
    originalText: String,
    suggestions: [{
        type: Schema.Types.ObjectId,
        ref: 'Suggestion'
    }]
});

module.exports = mongoose.model('Paragraph', ParagraphSchema);
