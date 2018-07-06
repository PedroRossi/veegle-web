import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SearchBox from '../../components/SearchBox';
import SearchButton from '../../components/SearchButton';
import Logo from '../../components/Logo';
import './index.css';

class Home extends Component {
    
    state = {
        elevation: 1,
        anchorEl: null,
        selectedIndex: 0,
        general: '',
        title: '',
        ingredients: '',
        steps: '',
    }

    _handleMenuItemClick = (ev, index) => this.setState({ selectedIndex: index });

    _handleValueChange = (key, value) => {
        let st = {};
        st[key] = value;
        this.setState(st);
    }

    _search = (ev) => {
        ev.preventDefault();
        const { selectedIndex, general, title, ingredients, steps } = this.state;
        let query = {};
        if (selectedIndex === 0)
            query = { general };
        else
            query = { name: title, ingredients, steps };
        this.props.history.push(`/search?query=${JSON.stringify(query)}`);
    }

    render() {
        const logo = Logo(1);

        return (
            <form className="home-wrapper" onSubmit={this._search}>
                <div>
                    {logo}
                    {/* <img src={logo} alt=""/> */}
                </div>
                <SearchBox
                    selectedIndex={this.state.selectedIndex}
                    onChangeSelectedIndex={this._handleMenuItemClick}
                    onChangeGeneral={(ev)  => this._handleValueChange('general', ev.target.value)}
                    onChangeTitle={(ev)  => this._handleValueChange('title', ev.target.value)}
                    onChangeIngredients={(ev)  => this._handleValueChange('ingredients', ev.target.value)}
                    onChangeSteps={(ev)  => this._handleValueChange('steps', ev.target.value)}
                />
                <div className="home-button">
                    <SearchButton />
                </div>
            </form>
        );
    }

}

export default withRouter(Home);