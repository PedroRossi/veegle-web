import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class SearchButton extends Component {

  render() {
    return (
        <Button variant="outlined" onClick={this.props.onClick} type='submit'>
            Pesquisar
        </Button>
    );
  }
}
