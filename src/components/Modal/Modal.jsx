/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getComments, addComment } from '../../api/comments';
import { getBigPhoto } from '../../api/photos';

import './Modal.scss';

const Modal = ({ isModalActive, setIsModalActive, selectedImage, modalPhoto }) => {
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorComment, setErrorComment] = useState(false);

  const dispatch = useDispatch();

  const updateComments = async() => {
    const postComments = await getComments(selectedImage);

    if (postComments.detail) {
      setComments([]);
    } else {
      setComments(postComments);
    }
  };

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    getBigPhoto(selectedImage)
      .then((photo) => {
        dispatch({
          type: 'GET_MODAL_PHOTO', payload: photo.url,
        });
      });

    updateComments();

    // eslint-disable-next-line consistent-return
    return () => {
      dispatch({ type: 'RESET_MODAL_PHOTO' });
    };
  }, [isModalActive, selectedImage]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setUserName(value);
    } else if (name === 'comment') {
      setNewComment(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userName) {
      setErrorName(true);
    }

    if (!newComment) {
      setErrorComment(true);
    }

    if (userName && newComment) {
      addComment(userName, newComment, selectedImage);
      setUserName('');
      setNewComment('');
      setErrorName(false);
      setErrorComment(false);
    }
  };

  const handleClose = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <>
      {isModalActive && (
        <div className="modal">
          <div className="modal__container">
            <div className="modal__info">
              <img
                className="modal__photo"
                src={modalPhoto}
                alt="nature"
              />
              <form className="modal__form" onSubmit={handleSubmit}>
                <label htmlFor="name" className="modal__label">
                  <input
                    className="modal__input"
                    type="text"
                    id="name"
                    name="name"
                    value={userName}
                    placeholder="Ваше имя"
                    onChange={handleChange}
                  />
                  {errorName && (
                    <p className="modal__error">Empty field</p>
                  )}
                </label>
                <label htmlFor="comment" className="modal__label">
                  <input
                    className="modal__input"
                    type="text"
                    id="comment"
                    name="comment"
                    value={newComment}
                    placeholder="Ваш комметарий"
                    onChange={handleChange}
                  />
                  {errorComment && (
                    <p className="modal__error">Empty field</p>
                  )}
                </label>
                <button className="modal__button" type="submit">
                  Оставить комментарий
                </button>
              </form>
            </div>

            {comments && (
            <div className="modal__comments">
              {comments.map(comment => (
                <div key={comment.id} className="modal__comment">
                  <p className="modal__name">
                    {comment.name}
                  </p>
                  <p className="modal__text">
                    {comment.description}
                  </p>
                </div>
              ))}
            </div>
            )}

            <button
              className="modal__close"
              type="button"
              onClick={handleClose}
            >
              <div className="modal__line-right" />
              <div className="modal__line-left" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  selectedImage: state.selectedImage,
  modalPhoto: state.modalPhoto,
});

export default connect(mapStateToProps)(Modal);

Modal.propTypes = {
  isModalActive: PropTypes.bool.isRequired,
  setIsModalActive: PropTypes.func.isRequired,
  selectedImage: PropTypes.number.isRequired,
  modalPhoto: PropTypes.string.isRequired,
};
