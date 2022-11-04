import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import React from 'react'

const CommentsModal = ({...props}) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <p style={{ fontWeight: 600, fontSize: 18 }}>Comments</p>
      </Modal.Header>
      <Modal.Body>
        {props.comments.map((itr, ind)=>{
            return <div><div style={{display:'flex'}}><p style={{fontWeight: 600}} key={ind}>{itr.name + ' - '}</p>{itr.text}</div>
            <p style={{fontSize:10, marginTop:'-10px'}}>{ moment(itr.createdAt).fromNow()}</p>
            </div>
        })}
      </Modal.Body>
    </Modal>
  )
}

export default CommentsModal