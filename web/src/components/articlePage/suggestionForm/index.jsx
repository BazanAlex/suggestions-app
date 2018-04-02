import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './suggestionForm.scss';
import {Spinner} from '../../spinner';

export class SuggestionForm extends Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    submit(event) {
        event.preventDefault();
        const {paragraph, submitSuggestion} = this.props;

        submitSuggestion(paragraph);
    }

    handleTextChange(event) {
        this.props.updateSuggestion(event.target.value, this.props.paragraph);
    }

    render() {
        const par = this.props.paragraph;

        return (
            <form onSubmit={this.submit}
                className="suggestion-form">
                <div>
                    <div className="definition">original text</div>
                    <div>{par.originalText}</div>
                </div>

                <div>
                    <label>
                        <div className="definition">users version</div>
                        <textarea required
                            value={par.usersText}
                            onChange={this.handleTextChange}
                            placeholder="Enter your own suggestion"></textarea>
                    </label>
                </div>

                <footer>
                    {par.busy ? <Spinner size="30px" /> : <ApplyBtn />}
                </footer>
            </form>
        );
    }
}

const ApplyBtn = (props) => {
    return (
        <button type="submit">
            <span className="checkmark">
                &#x2713;
            </span>
            send changes
        </button>
    );
}

SuggestionForm.propTypes = {
    paragraph: PropTypes.object.isRequired
};