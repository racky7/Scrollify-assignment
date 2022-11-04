import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ShareModal = ({ ...props }) => {
    const [msg, setMsg] = useState(false)
    const copyText = () => {
        navigator.clipboard.writeText(props.sharelink);
        setMsg(true)
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <p style={{ fontWeight: 600, fontSize: 18 }}>Share</p>
            </Modal.Header>
            <Modal.Body>
                <a target="_blank" href={props.sharelink}>{props.sharelink}</a>
                <br />
                <Button onClick={copyText}>Click to copy</Button>
                {msg && 'Link copied!'}
            </Modal.Body>
        </Modal>
    )
}

export default ShareModal