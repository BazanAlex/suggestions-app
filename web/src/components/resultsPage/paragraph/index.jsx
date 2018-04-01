import React, {Component} from 'react';

import './paragraph.scss';
import {Suggestion} from './suggestion';

export class Paragraph extends Component {
    constructor(props) {
        super(props);
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
                </div>
            </div>
        </div>);
    }
}
