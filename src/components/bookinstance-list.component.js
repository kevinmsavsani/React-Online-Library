import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookInstance = props => (
  <tr>
    <td><Link to={"/catalog/bookinstance/"+props.bookInstance._id}>{props.bookInstance.book.title}</Link></td>
    <td>{props.bookInstance.status}</td>
    <td>
      <Link to={"/catalog/bookinstance/edit/"+props.bookInstance._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBookInstance(props.bookInstance._id) }}>delete</a>
    </td>
  </tr>
)

export default class BookInstanceList extends Component {
  constructor(props) {
    super(props);

    this.deleteBookInstance = this.deleteBookInstance.bind(this)

    this.state = {bookInstances: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/bookInstances')
      .then(response => {
        this.setState({ bookInstances: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBookInstance(id) {
    axios.post('http://localhost:5000/catalog/bookinstance/'+id+'/delete')
      .then(response => { console.log(response.data)});

    this.setState({
      bookInstances: this.state.bookInstances.filter(el => el._id !== id)
    })
  }

  bookInstanceList() {
    return this.state.bookInstances.map(currentbookInstance => {
      return <BookInstance bookInstance={currentbookInstance} deleteBookInstance={this.deleteBookInstance} key={currentbookInstance._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged BookInstances</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Book</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.bookInstanceList() }
          </tbody>
        </table>
      </div>
    )
  }
}
