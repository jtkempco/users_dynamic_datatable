import React, { Component } from "react";
import { Container } from "reactstrap";
import DataTable from "./DataTable";
import Modal from "./MyModal";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      mode: "AddUser",
      EditIndex: null,
      modal: {
        title: "Add New User",
        buttonLabel: "Submit"
      },
      initialValues: {
        avatar: "",
        first_name: "",
        last_name: "",
        email: ""
      },
      users: [],
      newUser: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
      }
    };
  }

  async componentDidMount() {
    await axios.get("https://reqres.in/api/users?page=1").then(res => {
      const users = res.data.data;
      this.setState({ users });
    });
    await axios.get("https://reqres.in/api/users?page=2").then(res => {
      //const users = res.data.data;
      const users = this.state.users
        .concat(res.data.data)
        .sort((a, b) => (a.id < b.id ? 1 : -1));
      this.setState({ users });
    });
  }

  toggleModal = () => {
    console.log("toggle modal");
    this.setState({ showModal: !this.state.showModal });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = (values, mode, index) => {
    let { users } = this.state;

    if (mode === "update") {
      users[index] = { ...values };
      this.setState({ users, showModal: false });
      return;
    }

    values.id = this.getMaxId(users) + 1;

    const user = { ...values };

    //users = users.concat(user);
    users.unshift(user);

    this.setState({ users, showModal: false });
  };

  onAddUserChange = (e, key) => {
    let newUser = this.state.newUser;
    newUser[key] = key === "avatar" ? e : e.target.value.trim();
    this.setState({ newUser });
  };

  onAddUserClick = e => {
    console.log("clicked!");
    let { users, newUser } = this.state;

    console.log("users " + users);
    console.log("newUser " + JSON.stringify(newUser));
    // let { email, first_name, last_name, avatar } = newUser;
  };

  getMaxId = users => {
    let max = 0;
    users.forEach(user => {
      if (user.id > max) max = user.id;
    });
    return max;
  };

  handleDelete = id => {
    const users = this.state.users.filter(user => user.id !== id);
    this.setState({ users });
  };

  handleEdit = id => {
    const { users } = this.state;
    const index = users.findIndex(x => x.id === id);
    const user = users[index];
    this.setState({
      mode: "EditMode",
      initialValues: user,
      showModal: true,
      EditIndex: index,
      modal: {
        title: "Update User ID: " + user.id,
        buttonLabel: "Update"
      }
    });
    //const users = this.state.users.filter(user => user.id !== id);
    //this.setState({ users });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <h2>Users from API:</h2>
          <DataTable
            users={this.state.users}
            toggleModal={this.toggleModal}
            newUser={this.state.newUser}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
          />
        </Container>
        {this.state.showModal ? (
          <Modal
            mode={this.state.mode}
            initialValues={this.state.initialValues}
            EditIndex={this.state.EditIndex}
            title={this.state.modal.title}
            buttonLabel={this.state.modal.buttonLabel}
            className="my-modal modal-lg"
            handleSubmit={this.handleSubmit}
            onAddUserClick={this.onAddUserClick}
            onAddUserChange={this.onAddUserChange}
            newUser={this.state.newUser}
            closeModal={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
