import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ChannelService from "../../services/ChannelService";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import "./AddChannelModal.css";
import { MultiSelect } from "react-multi-select-component";

function AddChannelModal(props) {
  const { user, userList, setAddNewChannelFlag } = props;
  const [show, setShow] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  var memberIds = [];

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [selected2, setSelected2] = useState([]);
  var listOfUsers = [];

  userList.map((usr) => {
    const users = {
      label: usr.uid,
      value: usr.id,
    };
    listOfUsers.push(users);
  });

  selected2.map((ids) => {
    memberIds.push(ids.value);
  });

  async function addChannel() {
    await ChannelService.addChannel(
      user,
      setAddNewChannelFlag,
      newChannelName,
      memberIds
    );
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
          style={{ cursor: "pointer" }}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="addchannelmodal.channelname"
            >
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="My Channel"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <div>
              <h3>User(s)</h3>
              <MultiSelect
                options={listOfUsers}
                value={selected2}
                onChange={setSelected2}
                labelledBy="Select"
              />
            </div>
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
  );
}

export default AddChannelModal;
