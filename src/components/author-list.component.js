import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Author = props => (
  <tr>
    <td>
        <Link to={"/catalog/author/"+props.author._id}>{props.author.name}</Link>
    </td>
    <td>{props.author.date_of_birth}</td>
    <td>{props.author.date_of_death}</td>
    <td>
      <Link to={"/catalog/author/edit/"+props.author._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAuthor(props.author._id) }}>delete</a>
    </td>
  </tr>
)

export default class AuthorList extends Component {
  constructor(props) {
    super(props);

    this.deleteAuthor = this.deleteAuthor.bind(this)

    this.state = {authors: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/authors')
      .then(response => {
        this.setState({ authors: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAuthor(id) {
    axios.post('http://localhost:5000/catalog/author/'+id+'/delete')
      .then(response => { console.log(response.data)});

    this.setState({
      authors: this.state.authors.filter(el => el._id !== id)
    })
  }

  authorList() {
    return this.state.authors.map(currentauthor => {
      return <Author author={currentauthor} deleteAuthor={this.deleteAuthor} key={currentauthor._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Authors</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Date_of_birth</th>
              <th>Date_of_death</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.authorList() }
          </tbody>
        </table>
      </div>
    )
  }
}
