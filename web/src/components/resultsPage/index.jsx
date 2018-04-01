import React, {Component} from 'react';

import './resultsPage.scss';
import {ApiStub} from '../../api-stub';
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
    }

    componentDidMount() {
        const paragraphs = ApiStub.suggestionsGrpByParagraphs();

        this.setState({
            paragraphs
        });
    }

    addSuggestion(articleUrl, originalText, usersText) {
        // api call

        const target = this.state.paragraphs.find(p => p.articleUrl === articleUrl &&
            p.originalText === originalText);

        target.suggestions.push({
            usersText
        });

        this.setState({
            paragraphs: this.state.paragraphs
        });
    }

    deleteParagraph(paragraph) {
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
                    deleteParagraph={this.deleteParagraph} />}
        </section>);
    }
}