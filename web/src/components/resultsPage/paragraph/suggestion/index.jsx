import React, {Component} from 'react';

export class Suggestion extends Component {
    constructor(props) {
        super(props);

        this.approve = this.approve.bind(this);
    }

    approve() {
        this.props.approve(this.props.suggestion._id);
    }

    render() {
        const suggestion = this.props.suggestion;

        return (<div className="suggestion">
            {suggestion.usersText}

            <button
                onClick={this.approve}
                className="std-btn success">Approve</button>
        </div>);
    }
}