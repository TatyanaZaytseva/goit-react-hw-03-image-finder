import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from 'components/App/App.module.css';

export class App extends Component {
  state = {
    imageName: '',
    status: 'idle',
    page: 1,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
    this.setState({ page: 1 });
  };

  toggleLoading = () => {
    this.setState(state => ({ loading: !state.loading }));
  };

  setStatus = newStatus => {
    this.setState({ status: newStatus });
  };

  onLoadMoreClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    return (
      <div className={css.wrapper}>
        <Toaster />
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          setStatus={this.setStatus}
          page={this.state.page}
        />
        {this.state.status === 'loading' && <Loader />}
        {this.state.status === 'resolved' && (
          <Button onClick={this.onLoadMoreClick} />
        )}
      </div>
    );
  }
}
