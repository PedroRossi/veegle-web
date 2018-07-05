import React, { Component } from 'react';
import { Paper, Input, Button } from '@material-ui/core';
import './index.css';

const Logo = (multiplier = 1) => {
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

export default class Search extends Component {
    
    render() {
        const logo = Logo(1);
        return (
            <div className="search-wrapper">
                <div>
                    {logo}
                </div>
                <Paper className="search-input-box" elevation={3}>
                    <Input fullWidth disableUnderline/>
                </Paper>
                <div className="search-button">
                    <Button variant="outlined">
                        Pesquisar
                    </Button>
                </div>
            </div>
        );
    }

}