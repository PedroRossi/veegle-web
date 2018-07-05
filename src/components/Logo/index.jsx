import React from 'react';

export default (multiplier = 1) => {
    return (
        <span style={{fontSize: 80*multiplier, color: '#cbfd5b'}}>
            <span style={{fontSize: 100*multiplier, color: '#aadb12'}}>
                V
            </span>
            ee
            <span style={{color: '#f39c1d'}}>
                gl
            </span>
            e
        </span>
    );
}