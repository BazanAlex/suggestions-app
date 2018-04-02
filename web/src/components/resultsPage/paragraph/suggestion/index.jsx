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
        const btnText =  suggestion.isApproved ? 'Approved' : 'Approve';

        return (<div className="suggestion">
            {suggestion.usersText}

            <button
                onClick={this.approve}
                disabled={suggestion.isApproved}
                className="std-btn success">
                {btnText}
            </button>
        </div>);
    }
}