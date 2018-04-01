import React, {Component} from 'react';

import './spinner.scss';

export const Spinner = ({size, middle}) => {
    const style = {
        width: size,
        height: size
    };

    const middleClass = middle && 'middle';
    
    return (
        <div className={`loader ${middleClass}`} style={style}></div>
    );
}