import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from 'components/SearchBar/SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Введіть назву у пошуку');
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  handleInputChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch />
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
