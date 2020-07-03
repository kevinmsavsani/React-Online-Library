import React, { Component } from 'react';
import axios from 'axios';


export default class UpdateGenre extends Component {
  constructor(props) {
    super(props);

    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Genre: ''
    }
  }

  onChangeGenre(e) {
    this.setState({
      Genre: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const genre = {
      name: this.state.Genre
    }

    console.log(genre);

    axios.post('http://localhost:5000/catalog/genre/create', genre)
      .then(res => console.log(res.data));

    this.setState({
      Genre: ''
    })

    window.location = '/catalog/genres';

  }

  render() {
    return (
      <div>
        <h3>Create New Genre</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Genre: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.Genre}
                onChange={this.onChangeGenre}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Genre" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}