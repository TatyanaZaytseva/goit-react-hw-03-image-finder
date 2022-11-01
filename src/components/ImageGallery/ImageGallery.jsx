import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { request } from '../../api/request';
import toast from 'react-hot-toast';

export class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, setStatus, page } = this.props;
    if (imageName !== prevProps.imageName) this.setState({ images: [] });

    if (imageName !== prevProps.imageName || page !== prevProps.page) {
      setStatus('loading');

      try {
        request(imageName, setStatus, page).then(data => {
          console.log(data);
          if (data.hits.length < 1) {
            setStatus('rejected');
            toast.error('Результатів пошуку за даним запитом не знайдено');
          } else {
            setStatus('resolved');
          }
          this.setState(state => {
            return { images: [...state.images, ...data.hits] };
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  render() {
    return (
      this.state.images.length > 0 && (
        <ul className={css.gallery}>
          {this.state.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                id={image.id}
                smallImage={image.webformatURL}
                largeImage={image.largeImageURL}
                tag={image.tag}
              />
            );
          })}
        </ul>
      )
    );
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  setStatus: PropTypes.func.isRequired,
};
