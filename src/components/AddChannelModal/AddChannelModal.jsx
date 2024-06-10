import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ChannelService from '../../services/ChannelService';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import "./AddChannelModal.css";

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
     <div>
        <Icon
          name="users"
          size="large"
          color="white"
          onClick={handleShow}
          style={{ cursor: 'pointer' }}
        />
      </div>

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