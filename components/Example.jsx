import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import GoogleButton from 'react-google-button'


function Example() {
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login To Continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}> <Button><GoogleButton
/></Button></div>
         
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
           Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Example