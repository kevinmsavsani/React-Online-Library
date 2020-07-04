import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.author.name}</td>
    <td>{props.book.summary}</td>
    <td>
      <Link to={"/catalog/book/edit/"+props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
    </td>
  </tr>
)

export default class BookDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
        book: {},
        author:{}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/book/' + this.props.match.params.id)
      .then(response => {
        this.setState({ book: response.data ,
                        author: response.data.author});
        console.log(this.state.author);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3>{this.state.book.title}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <Book book={this.state.book} author={this.state.author} key={this.state.book._id}/>
          </tbody>
        </table>
      </div>
    )
  }
}
