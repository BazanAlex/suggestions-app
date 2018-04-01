import React, {Component} from 'react';

import './paragraph.scss';
import {Suggestion} from './suggestion';
import {NewSuggestion} from './newSuggestion';

export class Paragraph extends Component {
    constructor(props) {
        super(props);

        this.addSuggestion = this.addSuggestion.bind(this);
    }

    addSuggestion(usersText) {
        const {articleUrl, originalText} = this.props.paragraph;

        this.props.addSuggestion(articleUrl, originalText, usersText);
    }

    render() {
        const paragraph = this.props.paragraph;
        const suggestions = paragraph
            .suggestions.map((s, i) => 
                <Suggestion suggestion={s} key={i} />);

        return (<div className="paragraph">
            <button className="std-btn danger delete-btn">Delete</button>
            <div>
                <div className="term">
                    Original text
                </div>
                <div>{paragraph.originalText}</div>
            </div>

            <div>
                <div className="term">
                    User suggestions:
                </div>

                <div className="suggestion-list">
                    {suggestions}
                    <NewSuggestion addSuggestion={this.addSuggestion} />
                </div>
            </div>
        </div>);
    }
}
