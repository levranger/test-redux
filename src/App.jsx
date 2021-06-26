import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import Photos from './components/Photos/Photos';
import Modal from './components/Modal/Modal';
import Footer from './components/Footer/Footer';
import './App.scss';

export const App = () => {
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
        />
        <Modal
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
        />
        <Footer />
      </div>
    </div>
  );
};
