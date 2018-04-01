const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = Schema({
    articleUrl: {
        type: String,
        required: true
    },
    originalText: {
        type: String,
        required: true
    },
    usersText: {
        type: String,
        required: true
    },
    isApproved: Boolean,
    paragraph: {
        type: Schema.Types.ObjectId,
        ref: 'Paragraph'
    }
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
