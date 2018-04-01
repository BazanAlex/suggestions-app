import React, {Component} from 'react';

export class Suggestion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const suggestion = this.props.suggestion;

        return (<div className="suggestion">
            {suggestion.usersText}

            <button className="std-btn success">Approve</button>
        </div>);
    }
}