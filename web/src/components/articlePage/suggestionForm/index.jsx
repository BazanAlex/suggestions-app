import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './suggestionForm.scss';
import {Spinner} from '../../spinner';

export class SuggestionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            busy: false,
            text: ''
        };

        this.submit = this.submit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    submit(event) {
        event.preventDefault();

        console.log('submitting');
        // validation
        // api call
        this.setState({
            busy: true
        });
    }

    handleTextChange(event) {
        console.log('new text', event.target.value);

        this.setState({
            text: event.target.value
        });
    }

    render() {
        const paragraph = this.props.paragraph;

        return (
            <form onSubmit={this.submit}
                className="suggestion-form">
                <div>
                    <div className="definition">original text</div>
                    <div>{paragraph}</div>
                </div>

                <div>
                    <label>
                        <div className="definition">users version</div>
                        <textarea
                            value={this.state.text}
                            onChange={this.handleTextChange}
                            placeholder="Enter your own suggestion"></textarea>
                    </label>
                </div>

                <footer>
                    {this.state.busy ? <Spinner size="30px" /> : <ApplyBtn />}
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
    paragraph: PropTypes.string.isRequired
};