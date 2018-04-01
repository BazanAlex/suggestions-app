import React, {Component} from 'react';

import {Paragraph} from './paragraph';

export const ParagraphList = ({paragraphs}) => {
    const forms = paragraphs.map((p, i) => <Paragraph paragraph={p} key={i} />);
    
    return (
        <div className="paragraph-list">
            {forms}
        </div>
    );
};