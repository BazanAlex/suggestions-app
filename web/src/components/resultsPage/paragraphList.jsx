import React, {Component} from 'react';

import {Paragraph} from './paragraph';

export const ParagraphList = ({paragraphs,
    addSuggestion, deleteParagraph,
    approveParagraph}) => {
    const forms = paragraphs
        .map((p, i) => 
            <Paragraph paragraph={p}
                addSuggestion={addSuggestion}
                deleteParagraph={deleteParagraph}
                approveParagraph={approveParagraph}
                key={i} />);
    
    return (
        <div className="paragraph-list">
            {forms}
        </div>
    );
};