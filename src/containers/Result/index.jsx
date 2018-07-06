import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import SearchBox from '../../components/SearchBox';
import SearchButton from '../../components/SearchButton';
import Logo from '../../components/Logo';
import './index.css';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedIndex: 0,
            general: '',
            title: '',
            ingredients: '',
            steps: '',
            results: []
        }
    }

    async componentDidMount() {
        const search = this.props.location.search.substring(1);
        const query = JSON.parse(queryString.parse(search).query);
        let results = await fetch('http://localhost:5000/search', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: new Headers({'Content-Type': 'application/json'})
        });
        results = await results.json()
        for (let i=0;i<results.length;++i) {
            results[i].steps = results[i].steps.substring(0, results[i].steps.lastIndexOf(' ')) + '...'
        }
        let st = {
            loading: false,
            results: results
        }
        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                const element = query[key];
                if (key === 'name') 
                    st['title'] = element;
                else
                    st[key] = element;
            }
        }
        st.selectedIndex = query.hasOwnProperty('general') ? 0:1;
        this.setState(st);
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
        window.location.reload();
    }

    render() {
        const logo = Logo(0.5);
        const { results } = this.state;
        return (
            <div className="result-wrapper">
                <form onSubmit={this._search}>
                    <Grid container spacing={8}>
                        <Grid item xs={2}>
                            {logo}
                        </Grid>
                        <Grid item xs={6}>
                            <SearchBox
                                className="result-search-box"
                                selectedIndex={this.state.selectedIndex}
                                general={this.state.general}
                                title={this.state.title}
                                ingredients={this.state.ingredients}
                                steps={this.state.steps}
                                onChangeSelectedIndex={this._handleMenuItemClick}
                                onChangeGeneral={(ev)  => this._handleValueChange('general', ev.target.value)}
                                onChangeTitle={(ev)  => this._handleValueChange('title', ev.target.value)}
                                onChangeIngredients={(ev)  => this._handleValueChange('ingredients', ev.target.value)}
                                onChangeSteps={(ev)  => this._handleValueChange('steps', ev.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <SearchButton />
                        </Grid>
                    </Grid>
                </form>
                <div className="result-results">
                    {results.map((r, i) => {
                        return (
                            <div key={i}>
                                <h3>
                                    {r.name}
                                </h3>
                                <p>
                                    {r.steps}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default withRouter(Result);