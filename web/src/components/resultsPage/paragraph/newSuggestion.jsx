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

    addSuggestion(event) {
        event.preventDefault();

        this.props.addSuggestion(this.state.text);
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <form className="suggestion"
                onSubmit={this.addSuggestion}>
                <input required
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    className="std-input"
                    placeholder="Enter your own suggestion" />

                <button type="submit"
                    className="std-btn success">
                    Add
                </button>
            </form>
        );
    }
}