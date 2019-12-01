import React, { Component } from "react";
import AddUser from "./AddUserForm2";
import EditUser from "./EditUser";

import { Modal, ModalHeader } from "reactstrap";

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.mode);
    console.log(JSON.stringify(this.props.initialValues));

    const {
      title,
      className,
      mode,
      initialValues,
      EditIndex,
      buttonLabel
    } = this.props;

    return (
      <div>
        <Modal isOpen={true} className={className}>
          <ModalHeader toggle={this.props.closeModal}>{title}</ModalHeader>
          {mode === "EditMode" ? (
            <EditUser
              index={EditIndex}
              initialValues={initialValues}
              mode={mode}
              buttonLabel={buttonLabel}
              handleSubmit={this.props.handleSubmit}
              onAddUserChange={this.props.onAddUserChange}
            />
          ) : (
            <AddUser
              initialValues={initialValues}
              mode={mode}
              buttonLabel={buttonLabel}
              handleSubmit={this.props.handleSubmit}
              onAddUserChange={this.props.onAddUserChange}
            />
          )}
        </Modal>
      </div>
    );
  }
}

export default MyModal;
