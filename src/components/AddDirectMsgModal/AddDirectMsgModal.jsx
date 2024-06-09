import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { redirectDocument } from "react-router-dom";

function AddDirectMsgModal(props) {
  const {userList, setDirectMessageUsers} = props
  const [show, setShow] = useState(false);
  const [email, setEmail] =useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addDirectMessage(){
    let userId = 0;
    let userEmail = "" 
    let addUser = {}
    userList.map((ids) => {
      if (ids.uid === email){
        userId = ids.id
        userEmail = ids.uid

         addUser = {
          recId: ids.id,
          recUid: ids.uid
        }
        console.log(addUser);
      }
    })
    
    
    
    if (addUser.recId && addUser.recUid){
      setDirectMessageUsers((ids) => [...ids, addUser])
    }else{
      alert("User does not exist!")
    }
   
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        viewBox="0 0 640 512"
        onClick={handleShow}
      >
        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
      </svg>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send new message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="addchannelmodal.channelname"
            >
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="addchannelmodal.user">
              <Form.Label>User</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addDirectMessage}>
            Add reciever
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddDirectMsgModal;
