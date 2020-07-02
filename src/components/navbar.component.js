import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
export default class Navbar extends Component {

  render() {
    return (
        <div>
            <head>
              <title></title>
              <meta charset="utf-8" />
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
              <link rel="stylesheet" href="/stylesheets/style.css" />
            </head>
            <div class="header">
                <h1>My Website</h1>
            </div>

            <nav class="navbar navbar-expand-lg navbar-inverse">
                <div class="container-fluid">
                  <ul class="nav navbar-nav">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/catalog" className="nav-link">Library</Link></li>
                  </ul>
                </div>
            </nav>
          </div>
    );
  }
}