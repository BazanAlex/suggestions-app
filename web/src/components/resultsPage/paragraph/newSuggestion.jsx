import React, {Component} from 'react';

export class NewSuggestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.addSuggestion = this.addSuggestion.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    addSuggestion() {
        this.props.addSuggestion(this.state.text);
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div className="suggestion">
                <input
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    className="std-input"
                    placeholder="Enter your own suggestion" />

                <button
                    onClick={this.addSuggestion}
                    className="std-btn success">
                    Add
                </button>
            </div>
        );
    }
}