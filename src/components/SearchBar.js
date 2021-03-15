import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import svg from '../icons/sprite.svg';

class SearchBar extends React.Component {
  state = { value: '', error: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;

    if (value.match(/^[a-z0-9]+$/i)) this.props.onSubmit(value);
  };

  handleChange = e => {
    let error = this.state.error;

    const {
      target: { value },
    } = e;

    if (value) {
      error = !value.match(/^[a-z0-9]+$/i)
        ? 'Only alphanumeric characters allowed.'
        : '';
    }

    this.setState({ value, error });
  };

  render() {
    const { error, value } = this.state;
    return (
      <div className="w-75">
        <Form onSubmit={this.handleSubmit} className="d-flex w-100 my-3">
          <Form.Control
            className="rounded-0 header__input"
            placeholder="Search for a gifs..."
            type="text"
            value={value}
            onChange={this.handleChange}
            noValidate
          ></Form.Control>
          <Button variant="dark" className="rounded-0" type="submit">
            <svg className="header__icon">
              <use xlinkHref={`${svg}#icon-magnifying-glass`} />
            </svg>
          </Button>
        </Form>
        {error && (
          <Alert variant="danger" className="h5">
            {error}
          </Alert>
        )}
      </div>
    );
  }
}

export default SearchBar;
