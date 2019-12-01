import React, { Component, Fragment } from "react";
//import axios from "axios";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Table,
  Row,
  Col
} from "reactstrap";
import AvatarImage from "./AvatarImage";
import DataTableInfo from "./DataTableInfo";
import Pagination from "./MyPagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      users: props.users,
      addUser: "",
      newUser: props.newUser,
      /*
      newUser: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
      },
      */
      columns: [
        {
          name: "id",
          displayName: "#",
          sortable: true,
          active: true,
          default: "desc",
          current: "desc"
        },
        {
          name: "avatar",
          displayName: "Avatar",
          sortable: false,
          active: true,
          default: "desc",
          current: null
        },
        {
          name: "first_name",
          displayName: "First Name",
          sortable: true,
          active: false,
          default: "desc",
          current: null
        },
        {
          name: "last_name",
          displayName: "Last Name",
          sortable: true,
          active: false,
          default: "desc",
          current: null
        },
        {
          name: "email",
          displayName: "Email",
          sortable: true,
          active: false,
          default: "desc",
          current: null
        }
      ],
      perPage: 6,
      currentPage: 1
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.length !== prevState.users.length) {
      return { users: nextProps.users };
    } else return null;
  }
  /*
  onDelete = id => {
    const users = this.state.users.filter(user => user.id !== id);
    this.setState({ users });
  };

  onEdit = id => {
    const users = this.state.users.filter(user => user.id !== id);
    this.setState({ users });
  };
*/
  onChange = e => {
    this.setState({ filter: e.target.value });
  };

  onFilterChange = e => {
    console.log(e.target.value);
    this.setState({ filter: e.target.value });
  };

  onSelectChange = e => {
    console.log(e.target.value);
    this.setState({ perPage: e.target.value });
  };

  onAddUserChange = (e, key) => {
    let newUser = this.state.newUser;
    newUser[key] = key === "avatar" ? e : e.target.value.trim();
    this.setState({ newUser });
  };

  onAddUserClick = e => {
    console.log("clicked!");
    let { users, newUser } = this.state;
    let { email, first_name, last_name, avatar } = newUser;
    let my_errors = [];
    const emailValid = this.validateEmail(email);

    if (!emailValid) {
      my_errors.concat({ input: email, msg: "Email is invalid" });
    }

    const id = this.getMaxId(users) + 1;
    const user = { id, email, first_name, last_name, avatar };
    users = users.concat(user);
    newUser = {
      id: null,
      email: "",
      first_name: "",
      last_name: "",
      avatar: ""
    };

    this.setState({ users, newUser });
  };

  onClickSort = (key, i) => {
    console.log("clicked! " + key);
    let columns = this.state.columns;
    let column = columns[i];
    let users;

    if (column.active) {
      columns[i].current = column.current === "asc" ? "desc" : "asc";
    } else {
      columns.forEach(column => {
        column.active = false;
        column.current = null;
      });
      columns[i].active = true;
      columns[i].current = columns[i].default;
    }

    if (columns[i].current === "desc") {
      users = this.state.users.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    } else {
      users = this.state.users.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }

    this.setState({ users });
  };

  onPageClick = (e, active, number) => {
    e.preventDefault();
    console.log("active: " + active + ", number: " + number);
    if (!active) {
      this.setState({ currentPage: number });
    }
  };

  onPageStepClick = (e, n) => {
    e.preventDefault();
    this.setState({ currentPage: this.state.currentPage + n });
  };
  /*
  getMaxId = users => {
    let max = 0;
    users.forEach(user => {
      if (user.id > max) max = user.id;
    });
    return max;
  };

  validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
*/
  render() {
    const {
      users,
      columns,
      filter,
      newUser,
      currentPage,
      perPage
    } = this.state;

    const start = currentPage === 1 ? 1 : (currentPage - 1) * perPage;
    const end = currentPage * perPage;
    const total = users.length;
    const dataTableInfoProps = { start, end, total };

    let _users =
      filter === ""
        ? users
        : users.filter(
            user =>
              user.first_name
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase()) ||
              user.last_name
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase())
          );

    let addUserButtonDisabled = true;
    if (
      newUser.avatar !== "" &&
      newUser.first_name !== "" &&
      newUser.last_name !== "" &&
      newUser.email !== "" &&
      this.validateEmail(newUser.email)
    ) {
      addUserButtonDisabled = false;
    }

    _users = _users.slice((currentPage - 1) * perPage, perPage * currentPage);

    return (
      <Fragment>
        <Row>
          <Col className="mb-3">
            <Button color="primary" onClick={() => this.props.toggleModal()}>
              Add User
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-3">
            <Form inline>
              <FormGroup className="mr-auto">
                <Label for="exampleSelect" className="mr-2 font-weight-bold">
                  Show
                </Label>
                <Input
                  type="select"
                  name="users-per-page"
                  onChange={this.onSelectChange}
                >
                  <option>6</option>
                  <option>12</option>
                </Input>
                <Label className="ml-2 font-weight-bold">users</Label>
              </FormGroup>
            </Form>
          </Col>
          <Col md="6" className="mb-3">
            <Form inline>
              <FormGroup className="ml-auto">
                <Label for="exampleEmail" className="mr-sm-2 font-weight-bold">
                  Search:
                </Label>
                <Input
                  type="text"
                  name="SearchFilter"
                  onChange={this.onFilterChange}
                  value={filter}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table hover striped bordered table-sm>
              <thead>
                <tr>
                  {columns.map((column, i) => {
                    return column.sortable ? (
                      <th
                        rowspan="1"
                        colspan="1"
                        className={
                          "sorting " +
                          (column.active
                            ? "active sorting-" +
                              (column.current === null
                                ? column.default
                                : column.current)
                            : "")
                        }
                        onClick={() => this.onClickSort(column.name, i)}
                      >
                        {column.displayName}
                      </th>
                    ) : (
                      <th rowspan="1" colspan="1">
                        {column.displayName}
                      </th>
                    );
                  })}
                  <th />
                </tr>
              </thead>
              <tbody>
                {_users.map(user => {
                  return (
                    <tr key={user.id}>
                      <th
                        className="center"
                        scope="row"
                        rowSpan="1"
                        colSpan="1"
                      >
                        {user.id}
                      </th>
                      <td rowspan="1" colspan="1">
                        <AvatarImage src={user.avatar} />
                      </td>
                      <td rowspan="1" colspan="1">
                        {user.first_name}
                      </td>
                      <td rowspan="1" colspan="1">
                        {user.last_name}
                      </td>
                      <td rowspan="1" colspan="1">
                        {user.email}
                      </td>
                      <td rowspan="1" colspan="1">
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => this.props.onDelete(user.id)}
                        >
                          <FontAwesomeIcon
                            icon="trash-alt"
                            color="#fff"
                            size="md"
                          />
                        </Button>

                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => this.props.onEdit(user.id)}
                        >
                          <FontAwesomeIcon icon="edit" color="#fff" size="sm" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                {columns.map(column => (
                  <th>{column.displayName}</th>
                ))}
                <th />
              </tfoot>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTableInfo {...dataTableInfoProps} />
            <Pagination
              perPage={perPage}
              currentPage={currentPage}
              onPageClick={this.onPageClick}
              onPageStepClick={this.onPageStepClick}
              users={users.length}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default DataTable;
