import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Author = props => (
  <tr>
    <td>{props.author.name}</td>
    <td>{props.author.date_of_birth}</td>
    <td>{props.author.date_of_death}</td>
    <td>
      <Link to={"/catalog/author/edit/"+props.author._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAuthor(props.author._id) }}>delete</a>
    </td>
  </tr>
)

export default class AuthorDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {author: {}};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/author/' + this.props.match.params.id)
      .then(response => {
        this.setState({ author: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3>{this.state.author.name}</h3>
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
            <Author author={this.state.author} key={this.state.author._id}/>
          </tbody>
        </table>
      </div>
    )
  }
}
