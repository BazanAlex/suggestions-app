const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = Schema({
    articleUrl: String, //add url validation
    originalText: String,
    usersText: String,
    isApproved: Boolean,
    paragraph: {
        type: Schema.Types.ObjectId,
        ref: 'Paragraph'
    }
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
