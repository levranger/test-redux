/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getPhotos } from '../../api/photos';
import './Photos.scss';

const Photos = ({ setIsModalActive, images }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getPhotos()
      .then((photo) => {
        dispatch({
          type: 'UPLOAD_IMAGES', payload: photo,
        });
      });
  }, []);

  const getImgInfo = (id) => {
    setIsModalActive();
    dispatch({
      type: 'SELECT_IMAGE', payload: id,
    });
  };

  return (
    <section className="photos">
      <div className="photos__container">
        {!images && (
          <div className="photos__error">
            Loading... Please wait or try to reload.
          </div>
        )}

        {images && (
          <div className="photos__grid">
            {images.map(photo => (
              <div key={photo.id} className="photo__card">
                <img
                  className="photos__photo"
                  src={photo.url}
                  alt="nature"
                  onClick={() => getImgInfo(photo.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({ images: state.images });

export default connect(mapStateToProps)(Photos);

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  setIsModalActive: PropTypes.func.isRequired,
};
