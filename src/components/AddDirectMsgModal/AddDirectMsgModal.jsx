import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import './AddDirectMsgModal.css'; // Make sure to import the CSS file

function AddDirectMsgModal(props) {
  const { userList, setDirectMessageUsers } = props;
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addDirectMessage() {
    let userId = 0;
    let userEmail = "";
    let addUser = {};
    userList.map((ids) => {
      if (ids.uid === email) {
        userId = ids.id;
        userEmail = ids.uid;

        addUser = {
          recId: ids.id,
          recUid: ids.uid
        };
        console.log(addUser);
      }
    });

    if (addUser.recId && addUser.recUid) {
      setDirectMessageUsers((ids) => [...ids, addUser]);
    } else {
      alert("User does not exist!");
    }
  }

  return (
    <>
      <div className="direct-message-header">
        <span>Direct Messages</span>
        <Icon
          name="user plus"
          size="large"
          onClick={handleShow}
          className="white-icon"
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send new message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addchannelmodal.channelname">
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addDirectMessage}>
            Add receiver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddDirectMsgModal;
