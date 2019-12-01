import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FileInput from "./FileInput";
import {
  Button,
  FormGroup,
  Label,
  Input,
  ModalBody,
  ModalFooter
} from "reactstrap";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      mode: "update"
    };
  }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submitting");
          console.log(values);
          this.props.handleSubmit(values, this.state.mode, this.state.index);
        }}
        validationSchema={Yup.object().shape({
          avatar: Yup.string(),
          first_name: Yup.string().required("Required"),
          last_name: Yup.string().required("Required"),
          email: Yup.string()
            .email()
            .required("Required")
        })}
        render={({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="customFile">Profile Image</Label>
                <FileInput required="true" onChange={this.handleChange} />
                <Input
                  required="true"
                  type="hidden"
                  name="avatar"
                  value={values.avatar || this.state.initialValues.avatar}
                />
              </FormGroup>
              <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input
                  required="true"
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  className={
                    (errors.first_name && touched.first_name && "is-invalid") ||
                    (!errors.first_name && touched.first_name && "is-valid") ||
                    (!errors.first_name &&
                      values.first_name.length > 0 &&
                      "is-valid")
                  }
                />
                {errors.first_name && touched.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input
                  required="true"
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  className={
                    (errors.last_name && touched.last_name && "is-invalid") ||
                    (!errors.last_name && touched.last_name && "is-valid") ||
                    (!errors.last_name &&
                      values.last_name.length > 0 &&
                      "is-valid")
                  }
                />
                {errors.last_name && touched.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required="true"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    (errors.email && touched.email && "is-invalid") ||
                    (!errors.email && touched.email && "is-valid") ||
                    (!errors.email && values.email.length > 0 && "is-valid")
                  }
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                outline
                color="secondary"
                onClick={e => this.props.handleClick(e)}
              >
                Cancel
              </Button>{" "}
              <Button
                type="submit"
                className="submit-button"
                outline
                color="primary"
                disabled={isSubmitting}
              >
                {this.props.buttonLabel}
              </Button>
            </ModalFooter>
          </form>
        )}
      />
    );
  }
}
export default EditUser;
