import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MultiSelect } from "react-multi-select-component";
import ChannelService from "../../services/ChannelService";

function AddUserModal(props) {
  const { user, userList, headerName, chatId } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selected, setSelected] = useState([]);
  var listOfUsers = [];
  var selectedList = 0;

  userList.map((usr) => {
    const users = {
      label: usr.uid,
      value: usr.id,
    };
    listOfUsers.push(users);
  });

  selected.map((ids) => {
    selectedList = ids.value;
  });

  async function addUsers() {
    await ChannelService.addUsers(user, selectedList, chatId);
    setShow(false);
  }
  return (
    <>
      <svg
        className="add-user-modal-btn"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        width="30px"
        fill="white"
        onClick={handleShow}
      >
        <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l44.9 74.7c-16.1 17.6-28.6 38.5-36.6 61.5c-1.9-1.8-3.5-3.9-4.9-6.3L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
      </svg>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add users to {headerName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h3>User(s)</h3>
            <MultiSelect
              options={listOfUsers}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUsers}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUserModal;
