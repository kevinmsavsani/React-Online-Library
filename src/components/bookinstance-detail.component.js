import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookInstance = props => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.bookInstance.status}</td>
    <td>{props.bookInstance.due_back}</td>
    <td>
      <Link to={"/catalog/bookinstance/edit/"+props.bookInstance._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBookInstance(props.bookInstance._id) }}>delete</a>
    </td>
  </tr>
)

export default class BookInstanceDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
        bookInstance: {},
        book:{}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/bookinstance/' + this.props.match.params.id)
      .then(response => {
        this.setState({ bookInstance: response.data ,
                        book: response.data.book});
        console.log(this.state.book);
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
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <BookInstance bookInstance={this.state.bookInstance} book={this.state.book} key={this.state.bookInstance._id}/>
          </tbody>
        </table>
      </div>
    )
  }
}
