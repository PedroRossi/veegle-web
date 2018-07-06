import React, { Component } from 'react';
import { Paper, Grid, Input, TextField, Icon, IconButton, Menu, MenuItem } from '@material-ui/core';
import './index.css';

export default class SearchBox extends Component {

    state = {
        elevation: 1,
        anchorEl: null,
    }

    _handleFocus = (elevation) => this.setState({elevation});

    _iconClick = (event) => this.setState({ anchorEl: event.currentTarget });

    _closeMenu = () => this.setState({ anchorEl: null });

    render() {
        const { anchorEl, elevation } = this.state;
        const { selectedIndex, general, ingredients, name, steps } = this.props;

        return (
            <Paper className="search-input-box" elevation={elevation} square {...this.props}>
                <Grid container spacing={8}>
                    <Grid item xs={11}>
                        {selectedIndex === 0 ?
                            <Input
                                fullWidth
                                disableUnderline
                                className="search-input"
                                onFocus={() => this._handleFocus(3)}
                                onBlur={() => this._handleFocus(1)}
                                onChange={this.props.onChangeGeneral}
                                value={general}
                            />:
                            <TextField
                                fullWidth
                                label="Título"
                                className="search-input"
                                onFocus={() => this._handleFocus(3)}
                                onBlur={() => this._handleFocus(1)}
                                onChange={this.props.onChangeTitle}
                                value={name}
                            />
                        }
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton className="search-select" onClick={this._iconClick}>
                            <Icon>keyboard_arrow_down</Icon>
                        </IconButton>
                    </Grid>
                    {selectedIndex === 0 ? null:
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ingredientes"
                                    className="search-input"
                                    onFocus={() => this._handleFocus(3)}
                                    onBlur={() => this._handleFocus(1)}
                                    onChange={this.props.onChangeIngredients}
                                    value={ingredients}
                                />
                            </Grid>
                            <Grid item xs={12}>    
                                <TextField
                                    fullWidth
                                    label="Instruções"
                                    className="search-input"
                                    onFocus={() => this._handleFocus(3)}
                                    onBlur={() => this._handleFocus(1)}
                                    onChange={this.props.onChangeSteps}
                                    value={steps}
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
                            selected={index === selectedIndex}
                            onClick={(ev) => {
                                this.props.onChangeSelectedIndex(ev, index)
                                this._closeMenu()
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Paper>
        );
    }

}