import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import GoogleButton from 'react-google-button'
import Image from "next/image";
import india from "../public/india.png"
import stay from "../public/stay.png"
import Container from 'react-bootstrap/Container'
function Login() {
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Container style={{textAlign: "center"}}>
      <div className="p-2">
      
     <Button variant="primary" onClick={handleShow}>
     <Image src={india}/> <br/>
     Login As Tourist
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
      </div>
      <div className="p-2">
      <Button variant="primary" onClick={() => setShow(true)}>
     <Image src={stay}/> <br/>
     Login As Homestay Owner
      </Button>
      
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login  To Continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}> <Button><GoogleButton
/></Button></div>
         
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
           Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      
      </Container>
    </>
  );
}
export default Login