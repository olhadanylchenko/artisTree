import React, { Component } from "react";
import axios from "axios";

export default class AddArtwork extends Component {
  state = {
    title: "",
    description: "",
    images: [],
    uploadOn: false,
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  //upload artwork
  uploadMultiple = (event) => {
    event.preventDefault();
    const uploadData = new FormData();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadData.append("files", files[i]);
    }
    this.setState({ uploadOn: true }, () => {
      axios
        .post("/upload/multiple", uploadData, {
          headers: { crossdomain: true, "Content-Type": "undefined" },
        })
        .then((response) => {
          console.log(response.data);
          const imgUrls = response.data.data.map((image) => image.url);
          this.setState({ images: imgUrls, uploadOn: false });
        })
        .catch((error) => console.log(error));
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/artworks", {
        title: this.state.title,
        description: this.state.description,
        images: this.state.images,
      })
      .then(() => {
        this.setState({
          title: "",
          description: "",
          images: [],
        });
        // update state in artwork by executing getData()
        this.props.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.images);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          Add Artwork
          <label>
            Select images:
            <input
              type="file"
              name="files"
              multiple
              onChange={this.uploadMultiple}
            />
          </label>
          {!this.state.uploadOn && <input type="submit" value="Submit" />}
        </form>
      </div>
    );
  }
}
