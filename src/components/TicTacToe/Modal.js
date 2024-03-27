import React from 'react'
import './Modal.css'

const Modal = ({ winner, onClose }) => {
  return (
    <div className='modal'>
      <div className="modal-content">
        <h2>{winner} wins!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;