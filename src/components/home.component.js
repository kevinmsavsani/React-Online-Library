
import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
     constructor(props) {
        super(props);

        this.state = {data: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/catalog/')
          .then(response => {
            this.setState({ data: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

  render() {
    return (
      <div class="col-sm-10">
        <p>The library has the following record counts:</p>
        <ul>
          <li><strong>Books:</strong> {this.state.data.book_count} </li>
          <li><strong>Copies:</strong> {this.state.data.book_instance_count} </li>
          <li><strong>Copies available:</strong> {this.state.data.book_instance_available_count} </li>
          <li><strong>Authors:</strong> {this.state.data.author_count} </li>
          <li><strong>Genres:</strong> {this.state.data.genre_count} </li>
        </ul>
      </div>
    )
  }
}