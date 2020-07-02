
import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div class="col-sm-10">
        <p>The library has the following record counts:</p>
        <ul>
          <li><strong>Books:</strong> "data.book_count"</li>
          <li><strong>Copies:</strong> "data.book_instance_count"</li>
          <li><strong>Copies available:</strong> "data.book_instance_available_count"</li>
          <li><strong>Authors:</strong> "data.author_count"</li>
          <li><strong>Genres:</strong> "data.genre_count"</li>
        </ul>
      </div>
    )
  }
}