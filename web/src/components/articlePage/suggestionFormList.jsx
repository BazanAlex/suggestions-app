import React, {Component} from 'react';

import {SuggestionForm} from './suggestionForm';

export const SuggestionFormList = ({article, submitSuggestion, updateSuggestion}) => {
    const paragraphForms = article.paragraphs
        .map((p, i) => <SuggestionForm 
                        paragraph={p} 
                        key={i}
                        submitSuggestion={submitSuggestion}
                        updateSuggestion={updateSuggestion} />);

    return (<div>
        <h2>{article.title}</h2>

        {paragraphForms}
    </div>);
}