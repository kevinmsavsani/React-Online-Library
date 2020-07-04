import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Genre = props => (
  <tr>
      <td>
            <Link to={"/catalog/genre/"+props.genre._id}>{props.genre.name}</Link>
      </td>
    <td>
      <Link to={"/catalog/genre/edit/"+props.genre._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGenre(props.genre._id) }}>delete</a>
    </td>
  </tr>
)

export default class GenreList extends Component {
  constructor(props) {
    super(props);

    this.deleteGenre = this.deleteGenre.bind(this)

    this.state = {genres: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/genres')
      .then(response => {
        this.setState({ genres: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGenre(id) {
    axios.post('http://localhost:5000/catalog/genre/delete/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      genres: this.state.genres.filter(el => el._id !== id)
    })
  }

  genreList() {
    return this.state.genres.map(currentgenre => {
      return <Genre genre={currentgenre} deleteGenre={this.deleteGenre} key={currentgenre._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Genres</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.genreList() }
          </tbody>
        </table>
      </div>
    )
  }
}
