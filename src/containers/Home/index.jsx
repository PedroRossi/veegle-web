import React, { Component } from 'react';
import { Paper, Grid, Input, TextField, Button, IconButton, Icon, Menu, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Logo from '../../components/Logo';
import './index.css';

class Home extends Component {
    
    state = {
        elevation: 1,
        advanced: false,
        anchorEl: null,
        selectedIndex: 0,
        general: '',
        title: '',
        ingredients: '',
        steps: '',
    }

    _handleFocus = (elevation) => this.setState({elevation});

    _iconClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    _closeMenu = () => {
        this.setState({
            anchorEl: null,
        });
    };

    _handleValueChange = (key, value) => {
        let st = {};
        st[key] = value;
        this.setState(st);
    };

    _handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null });
    };

    _search = () => {
        const { selectedIndex, general, title, ingredients, steps } = this.state;
        let query = {};
        if (selectedIndex === 0)
            query = { general };
        else
            query = { title, ingredients, steps };
        this.props.history.push(`/search?query=${JSON.stringify(query)}`);
    }

    render() {
        const { anchorEl, selectedIndex, elevation } = this.state;
        const logo = Logo(1);

        return (
            <div className="home-wrapper">
                <div>
                    {logo}
                </div>
                <Paper className="home-input-box" elevation={elevation} square>
                    <Grid container spacing={8}>
                        <Grid item xs={11}>
                            {selectedIndex === 0 ?
                                <Input
                                    fullWidth
                                    disableUnderline
                                    className="home-input"
                                    onFocus={() => this._handleFocus(3)}
                                    onBlur={() => this._handleFocus(1)}
                                    onChange={(ev)  => this._handleValueChange('general', ev.target.value)}
                                />:
                                <TextField
                                    fullWidth
                                    label="Título"
                                    className="home-input"
                                    onFocus={() => this._handleFocus(3)}
                                    onBlur={() => this._handleFocus(1)}
                                    onChange={(ev)  => this._handleValueChange('title', ev.target.value)}
                                />
                            }
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton className="home-select" onClick={this._iconClick}>
                                <Icon>keyboard_arrow_down</Icon>
                            </IconButton>
                        </Grid>
                        {selectedIndex === 0 ? null:
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Ingredientes"
                                        className="home-input"
                                        onFocus={() => this._handleFocus(3)}
                                        onBlur={() => this._handleFocus(1)}
                                        onChange={(ev)  => this._handleValueChange('ingredients', ev.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>    
                                    <TextField
                                        fullWidth
                                        label="Instruções"
                                        className="home-input"
                                        onFocus={() => this._handleFocus(3)}
                                        onBlur={() => this._handleFocus(1)}
                                        onChange={(ev)  => this._handleValueChange('steps', ev.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={this._closeMenu}
                    >
                        {['Pesquisa simples', 'Pesquisa avançada'].map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === this.state.selectedIndex}
                                onClick={event => this._handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Paper>
                <div className="home-button">
                    <Button variant="outlined" onClick={this._search}>
                        Pesquisar
                    </Button>
                </div>
            </div>
        );
    }

}

export default withRouter(Home);