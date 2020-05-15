import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component {
  state = {
    imageUrl: null,
    username: null,
    location: null,
    role: null,
    artworks: []
  };

  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  }

    //change pfp
  handleFileChange(event) {
    const uploadData = new FormData();
    uploadData.append('imageUrl', event.target.files[0])
    uploadData.append('username', this.state.username)
    console.log(uploadData)
    //need to change this route?
    axios.post("http://localhost:5000/auth/upload", uploadData)
    .then(response => this.setState({ imageUrl: response.data.secure_url}))
    .catch(error => console.log(error))
  }
  

    handleSubmit = event => {
      event.preventDefault();
      const id = this.props.match.params.id;
      axios.put(`/profile/${id}`, {
        imageUrl: this.state.imageUrl,
        username: this.state.username,
        location: this.state.location,
      })
        .then(response => {
          this.setState({
            imageUrl: response.data.imageUrl,
            username: response.data.username,
            location: response.data.location,
            editForm: false
          })
        }).catch(err => {
          console.log(err);
        })
    }

  getData = () => {
    const id = this.props.match.params.id;
    console.log(id);
    axios
    .get(`/profile/`)
    .then(response => {
      console.log(response);
      this.setState({
        imageUrl: response.data.imageUrl,
        username: response.data.username,
        location: response.data.location,
        role: response.data.role,
        artworks: response.data.artworks,
        })
    })
    .catch(error => {
      if (error.response.status === 404) {
        this.setState({ error: 'Not found' })
      }  
    })
  }

 
  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  }
  

  componentDidMount = () => {
    this.getData();
  }
  
  componentDidUpdate = () => {
    this.getData();
  }

  render() {
    if (this.state.error) return <div>{this.state.error}</div>
    if (!this.state.username) return (<></>)
    let allowedToEdit = false;
    const user = this.props.user;
    const owner = this.state.profile.owner;
    //toggle edit picture if owner of profile
    if (user && user._id === owner) allowedToEdit = true;
    return (
      <div>
       <h1>{this.state.username}</h1>
       <img src={this.state.imageUrl} alt="img"/>
       <button onClick={this.toggleEditForm}>Edit Picture</button>
       <p>{this.state.location}</p>
      </div>
    )
  }
}
