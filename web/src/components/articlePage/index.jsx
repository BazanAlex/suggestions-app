import React, {Component} from 'react';
import query from 'query-string';

import './articlePage.scss';
import {SuggestionFormList} from './suggestionFormList';
import {ApiStub} from '../../api-stub';
import {Spinner} from '../spinner';
import {Api} from '../../api';

export class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                paragraphs: []
            },
            busy: false
        };
    }

    componentDidMount() {
        const articleUrl = query.parse(location.search).articleUrl;
        console.log('articleUrl', articleUrl);

        const article = ApiStub.getArticle();

        this.setState({ busy: true });
        Api.getArticle(articleUrl)
            .then((article) => {
                this.setState({ 
                    article,
                    busy: false
                });
            });
    }

    render() {
        return (
            <section className="page-container">
                {this.state.busy ? 
                    <Spinner middle={true} size="50px" /> : 
                    <SuggestionFormList article={this.state.article} />}
            </section>
        );
    }
}