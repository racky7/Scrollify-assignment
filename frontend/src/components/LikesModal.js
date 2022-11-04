import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React from 'react'

const LikesModal = ({...props}) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <p style={{ fontWeight: 600, fontSize: 18 }}>Likes</p>
      </Modal.Header>
      <Modal.Body>
        {props.likes.map((itr, ind)=>{
            return <p key={ind}>{ind+1}. {itr.name}</p>
        })}
      </Modal.Body>
    </Modal>
  )
}

export default LikesModal