import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import Photos from './components/Photos/Photos';
import Modal from './components/Modal/Modal';
import Footer from './components/Footer/Footer';
import './App.scss';

export const App = () => {
  const [imgId, setImgId] = useState(0);
  const isModalActive = useSelector(state => state.isModalActive);

  const dispatch = useDispatch();

  const setIsModalActive = () => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };

  return (
    <div className="content">
      <div className="content__container">
        <Header />
        <Photos
          setIsModalActive={setIsModalActive}
          setImgId={setImgId}
        />
        <Modal
          isModalActive={isModalActive}
          imgId={imgId}
          setIsModalActive={setIsModalActive}
        />
        <Footer />
      </div>
    </div>
  );
};
