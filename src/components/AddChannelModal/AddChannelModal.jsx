import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ChannelService from '../../services/ChannelService';


function AddChannelModal(props) {

  const {user, setAddNewChannelFlag} = props
  const [show, setShow] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [memberIds, setMemberIds] = useState([]);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function addChannel(){
    await ChannelService.addChannel(user, setAddNewChannelFlag, newChannelName, memberIds);
    setShow(false);
  }

  return (
    <>
     <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              viewBox="0 0 448 512"
              onClick={handleShow}
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addchannelmodal.channelname">
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="My Channel"
                value = {newChannelName}
                onChange = {(e) => setNewChannelName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addchannelmodal.user">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@email.com"
                value = {memberIds}
                onChange = {(e2) => setMemberIds(e2.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addChannel}>
            Create Channel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddChannelModal;