import { Component } from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import toast from 'react-hot-toast';

const API_KEY = '29872445-b11cb18030e5a7e55f6afbc9a';
const BASE_URL = 'https://pixabay.com/api/';
const PARAMS = 'image_type=photo&orientation=horizontal&per_page=12';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { setStatus, page } = this.props;
    if (
      prevProps.imageName !== this.props.imageName ||
      page !== prevProps.page
    ) {
      setStatus('loading');

      let url = `${BASE_URL}?q=${this.props.imageName}&page=${page}&key=${API_KEY}&${PARAMS}`;
      setTimeout(() => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.hits.length < 1) {
              setStatus('rejected');
              toast.error('Результатів пошуку за даним запитом не знайдено');
            } else {
              setStatus('resolved');
            }
            this.setState({ images: data.hits });
          })
          .catch(error => this.setState({ error }));
      }, 2000);
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
