import React, {Component} from 'react';

import './resultsPage.scss';
import {Api} from '../../api';
import {ParagraphList} from './paragraphList';
import {Spinner} from '../spinner';

export class ResultsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paragraphs: [],
            busy: false
        };

        this.addSuggestion = this.addSuggestion.bind(this);
        this.deleteParagraph = this.deleteParagraph.bind(this);
        this.approveParagraph = this.approveParagraph.bind(this);
    }

    componentDidMount() {
        this.setState({ busy: true });

        Api.getGroupedSuggestions()
            .then(paragraphs => {
                this.setState({
                    paragraphs,
                    busy: false
                });
            });
    }

    addSuggestion(articleUrl, originalText, usersText) {
        // api call

        const target = this.state.paragraphs.find(p => p.articleUrl === articleUrl &&
            p.originalText === originalText);

        Api.submitSuggestion({
            articleUrl,
            originalText,
            usersText
        }).then(res => {
            console.log('suggestion res is', res);

            target.suggestions.push({
                usersText: res.usersText,
                _id: res._id
            });

            this.setState({
                paragraphs: this.state.paragraphs
            });
        });
    }

    deleteParagraph(paragraph) {
        this.setState({ busy: true });

        Api.deleteParagraph(paragraph._id)
            .then(() => {
                this.removeFromCollection(paragraph);
                this.setState({ busy: false });
            });
    }

    approveParagraph(paragraph, suggestionId) {
        Api.approveSuggestion(suggestionId)
            .then(() => {
                this.removeFromCollection(paragraph); // one thing! If it's approved page, then not doing that
            });
    }

    removeFromCollection(paragraph) {
        const newParagraphs = this.state.paragraphs
            .filter(p => p.originalText !== paragraph.originalText ||
                p.articleUrl !== paragraph.articleUrl);

        this.setState({
            paragraphs: newParagraphs
        });
    }

    render() {
        return (<section className="page-container">
            <h2>Paragraph Page</h2>

            {this.state.busy ? 
                <Spinner middle={true} size="50px" /> :
                <ParagraphList
                    paragraphs={this.state.paragraphs}
                    addSuggestion={this.addSuggestion}
                    newSuggestionData={this.state.newSuggestion}
                    deleteParagraph={this.deleteParagraph}
                    approveParagraph={this.approveParagraph} />}
        </section>);
    }
}