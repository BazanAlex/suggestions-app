import React, {Component} from 'react';
import query from 'query-string';
import * as Toastr from 'toastr';

import './articlePage.scss';
import {SuggestionFormList} from './suggestionFormList';
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

        this.submitSuggestion = this.submitSuggestion.bind(this);
        this.updateSuggestion = this.updateSuggestion.bind(this);
    }

    submitSuggestion(paragraph) {
        paragraph.busy = true;
        this.setState({
            article: this.state.article
        });

        Api.submitSuggestion({
            articleUrl: this.articleUrl,
            originalText: paragraph.originalText,
            usersText: paragraph.usersText
        }).then((res) => {
            paragraph.busy = false;

            this.setState({
                article: this.state.article
            });

            Toastr.info(`Suggestion "${paragraph.usersText}" is submitted`);
        }).catch(err => {
            this.setState({ busy: false });
            Toastr.error('Unexpected error occured');
        })
    }

    updateSuggestion(newUsersText, paragraph) {
        paragraph.usersText = newUsersText;

        this.setState({
            article: this.state.article
        });
    }

    get articleUrl() {
        return query.parse(location.search).articleUrl;
    }

    componentDidMount() {
        this.setState({ busy: true });
        Api.getArticle(this.articleUrl)
            .then((article) => {
                const articleState = {
                    title: article.title,
                    paragraphs: article.paragraphs.map((p) => {
                        return {
                            originalText: p,
                            usersText: p,
                            isBusy: false
                        };
                    })
                }

                this.setState({
                    article: articleState,
                    busy: false
                });
            }).catch(err => {
                this.setState({ busy: false });
                Toastr.error('Unexpected error occured');
            });
    }

    render() {
        return (
            <section className="page-container">
                {this.state.busy ? 
                    <Spinner middle={true} size="50px" /> : 
                    <SuggestionFormList
                        article={this.state.article}
                        submitSuggestion={this.submitSuggestion}
                        updateSuggestion={this.updateSuggestion} />}
            </section>
        );
    }
}