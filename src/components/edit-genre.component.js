import React, { Component } from 'react';
import axios from 'axios';

export default class EditGenre extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/genre/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const genre = {
      name: this.state.name
    };

    console.log(genre);

    axios.post('http://localhost:5000/catalog/genre/edit/'+this.props.match.params.id, genre)
      .then(res => console.log(res.data));

    window.location = '/catalog/genre/'+this.props.match.params.id;
  }

  render() {
    return (
      <div>
        <h3>Edit Genre</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
              <label>Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  />
            </div>

          <div className="form-group">
            <input type="submit" value="Edit Genre" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}