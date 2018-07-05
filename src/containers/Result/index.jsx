import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Logo from '../../components/Logo';
import './index.css';

const mockResults = [
    {
        title: 'Coxinha de jaca',
        instructions: 'Pegue a coxinha e ...'
    },
    {
        title: 'Coxinha de jaca',
        instructions: 'Pegue a coxinha e ...'
    },
    {
        title: 'Coxinha de jaca',
        instructions: 'Pegue a coxinha e ...'
    },
];

class Result extends Component {

    constructor(props) {
        super(props);
        const search = this.props.location.search.substring(1);
        this.query = JSON.parse(queryString.parse(search).query);
        console.log(this.query);
    }

    componentDidMount() {

    }

    render() {
        const logo = Logo(0.5);
        return (
            <div className="result-wrapper">
                <div>
                    {logo}
                    search
                </div>
                <div className="result-results">
                    {mockResults.map((r, i) => {
                        return (
                            <div key={i}>
                                <h3>
                                    {r.title}
                                </h3>
                                <p>
                                    {r.title}
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