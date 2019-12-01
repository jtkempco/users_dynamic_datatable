import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Form
} from "reactstrap";
import FileInput from "./FileInput";

class MyModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      fields: [
        {
          label: "First Name",
          name: "first_name",
          type: "text",
          value: props.newUser.first_name,
          required: true,
          completed: false,
          error: ""
        },
        {
          label: "Last Name",
          name: "last_name",
          type: "text",
          value: props.newUser.last_name,
          required: true,
          completed: false,
          error: ""
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          value: props.newUser.email,
          required: true,
          completed: false,
          error: ""
        }
      ],
      newUser: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
      }
    };
  }

  toggle = () => {
    console.log("toggle");
  };

  validate = e => {
    e.preventDefault();
    console.log("clicked!");
    let { newUser, fields } = this.state;

    console.log("newUser " + JSON.stringify(newUser));
    console.log("fields " + JSON.stringify(fields));

    let o;

    fields.forEach(field => {
      if (field.name === "first_name" || field.name === "last_name") {
        o = this.validateString(newUser[field.name], field.label);
        field.value = newUser[field.name];
        field.completed = o.completed;
        field.error = o.error;
      } else {
        if (field.name === "email") {
          o = this.validateEmail(newUser[field.name]);
          field.value = newUser[field.name];
          field.completed = o.completed;
          field.error = o.error;
        }
      }
    });
    console.log("fields " + JSON.stringify(fields));
    //let { email, first_name, last_name, avatar } = newUser;

    this.setState({ validated: true, fields });
  };

  validateEmail = email => {
    if (email === null || email === "") {
      return { completed: false, error: "Email is required." };
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { completed: true, error: "" };
    } else {
      return { completed: false, error: "Not a valid email address." };
    }
  };
  validateString = (string, displayName) => {
    let errorMsg = "";

    string = string.trim();
    const regex = new RegExp("^[a-zA-Z ]+$");

    if (string === null || string === "") {
      errorMsg = displayName + " is required.";
      return { completed: false, error: errorMsg };
    } else if (!regex.test(string)) {
      errorMsg = "Contains invalid charecters (letters and spaces only!)";
      return { completed: false, error: errorMsg };
    } else {
      return { completed: true, error: "" };
    }
  };

  onChange = (e, key) => {
    let newUser = this.state.newUser;
    newUser[key] = key === "avatar" ? e : e.target.value.trim();
    this.setState({ newUser });
  };

  render() {
    const { title, buttonLabel, className, newUser } = this.props;

    return (
      <div>
        <Modal isOpen={true} className={className}>
          <ModalHeader toggle={this.props.closeModal}>{title}</ModalHeader>
          <ModalBody>
            <Form className={this.state.validated ? "was-validated" : null}>
              <FormGroup>
                <Label for="Avatar">Avatar</Label>
                <FileInput
                  onAddUserChange={this.props.onAddUserChange}
                  value={newUser.avatar}
                />
              </FormGroup>
              {this.state.fields.map(field => {
                return (
                  <FormGroup key={field.name}>
                    <Label for="FirstName">{field.label}</Label>
                    <Input
                      required={field.required}
                      type={field.type}
                      name={field.name}
                      onChange={e => this.onChange(e, field.name)}
                      value={field.user}
                    />
                    {field.error.length > 0 ? (
                      <div className="invalid-feedback">{field.error}</div>
                    ) : null}
                  </FormGroup>
                );
              })}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.toggle}>
              Cancel
            </Button>{" "}
            <Button outline color="primary" onClick={e => this.validate(e)}>
              {buttonLabel}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
