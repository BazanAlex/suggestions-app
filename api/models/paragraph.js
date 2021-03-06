const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParagraphSchema = Schema({
    articleUrl: {
        type: String,
        required: true
    },
    originalText: {
        type: String,
        required: true
    },
    suggestions: [{
        type: Schema.Types.ObjectId,
        ref: 'Suggestion'
    }]
});

module.exports = mongoose.model('Paragraph', ParagraphSchema);
