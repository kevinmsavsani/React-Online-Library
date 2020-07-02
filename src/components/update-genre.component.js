import React, { Component } from 'react';


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
      Genre: this.state.Genre
    }

    console.log(genre);

    this.setState({
      Genre: ''
    })
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