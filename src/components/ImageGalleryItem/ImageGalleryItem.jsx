import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isModalOpen) {
      window.addEventListener('keydown', this.onModalKeydown);
    } else window.removeEventListener('keydown', this.onModalKeydown);
  }

  onModalKeydown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { smallImage, largeImage, tag } = this.props;
    return (
      <li className={css.gallery_item}>
        <img
          src={smallImage}
          alt={tag}
          className={css.gallery_image}
          onClick={this.openModal}
        />
        {this.state.isModalOpen && (
          <Modal
            largeImage={largeImage}
            tag={tag}
            onModalClose={this.closeModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
