import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
export default class SideNavbar extends Component {

  render() {
    return (
        <div>
                  <div class="col-sm-2">
                    <ul class="vertical-menu">
                        <Link to="/catalog/books" className="nav-link">All books</Link>
                        <Link to="/catalog/authors" className="nav-link">All authors</Link>
                        <Link to="/catalog/genres" className="nav-link">All genres</Link>
                        <Link to="/catalog/bookinstances" className="nav-link">All book-instances</Link>
                    </ul>
                    <ul class="vertical-menu">
                        <Link to="/catalog/book/create" className="nav-link">Create new book</Link>
                        <Link to="/catalog/author/create" className="nav-link">Create new author</Link>
                        <Link to="/catalog/genre/create" className="nav-link">Create new genre</Link>
                        <Link to="/catalog/bookinstance/create" className="nav-link">Create new bookinstance</Link>
                    </ul>
                  </div>
          </div>
    );
  }
}