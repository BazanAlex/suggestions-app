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
    }

    componentDidMount() {
        const paragraphs = ApiStub.suggestionsGrpByParagraphs();

        this.setState({
            paragraphs
        });
    }

    render() {
        return (<section className="page-container">
            <h2>Paragraph Page</h2>

            {this.state.busy ? 
                <Spinner middle={true} size="50px" /> :
                <ParagraphList paragraphs={this.state.paragraphs} />}
        </section>);
    }
}