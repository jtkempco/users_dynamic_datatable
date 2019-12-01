import React, { Component } from "react";
import { CustomInput, FormGroup, Input } from "reactstrap";

export default class FileInput extends Component {
  state = {
    fileName: "",
    invalidFile: false
  };

  handleFileChange = this.handleFileChange.bind(this);
  handleFileChange({ target: { files } }) {
    const cancel = !files.length;
    if (cancel) return;

    const [{ size, name }] = files;
    const maxSize = 50000;

    if (size < maxSize) {
      this.setState({ fileName: name, invalidFile: false });
    } else {
      this.setState({ fileName: "", invalidFile: true });
    }

    this.props.handleChange(name, "avatar");
    //console.log("file: " + name);
  }

  render() {
    const { fileName, invalidFile } = this.state;

    return (
      <FormGroup>
        <CustomInput
          type="file"
          name="customFile"
          className="form-control"
          label={fileName || "choose an image file"}
          onChange={this.handleFileChange}
          invalid={invalidFile}
        />
      </FormGroup>
    );
  }
}
