import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const GifItem = ({ gif }) => {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <img
          className="gif-container__img"
          alt={gif.id}
          src={gif.images.fixed_height.url}
        />
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <img
            className="modal-header__image"
            alt={gif.id}
            src={gif.images.fixed_height.url}
          />
        </Modal.Header>
      </Modal>
    </>
  );
};

export default GifItem;
