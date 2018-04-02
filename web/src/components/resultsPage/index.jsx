import React, {Component} from 'react';
import query from 'query-string';
import * as Toastr from 'toastr';

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

        Api.getGroupedSuggestions(this.showApproved)
            .then(paragraphs => {
                this.setState({
                    paragraphs,
                    busy: false
                });
            });
    }

    get showApproved() {
        const showApprovedParam = query.parse(location.search).showApproved;
        return JSON.parse(showApprovedParam);
    }

    addSuggestion(articleUrl, originalText, usersText) {
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

                Toastr.warning(`Paragraph "${paragraph.originalText}"
                    was removed with all suggestions`);
            });
    }

    approveParagraph(paragraph, suggestionId) {
        Api.approveSuggestion(suggestionId)
            .then(() => {
                if (this.showApproved) {
                    const approvedSug = paragraph
                        .suggestions.find(s => s._id === suggestionId);

                    // disaproving others
                    paragraph.suggestions
                        .filter(s => s._id !== suggestionId)
                        .forEach(s => s.isApproved = false);

                    approvedSug.isApproved = true;
                    
                    this.setState({ paragraphs: this.state.paragraphs });
                } else {
                    this.removeFromCollection(paragraph);
                    Toastr.info(`Suggestion for paragraph 
                        "${paragraph.originalText}" is approved`)
                }
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