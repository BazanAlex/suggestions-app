import React, {Component} from 'react';

import {Paragraph} from './paragraph';

export const ParagraphList = ({paragraphs, addSuggestion}) => {
    const forms = paragraphs
        .map((p, i) => 
            <Paragraph paragraph={p}
                addSuggestion={addSuggestion}
                key={i} />);
    
    return (
        <div className="paragraph-list">
            {forms}
        </div>
    );
};