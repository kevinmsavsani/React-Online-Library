import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import SideNavbar from "./components/sidenavbar.component.js";
import Home from "./components/home.component.js";
import AuthorList from "./components/author-list.component.js";
import CreateAuthor from "./components/update-author.component.js";
import BookList from "./components/book-list.component.js";
import CreateBook from "./components/update-book.component.js";
import BookInstanceList from "./components/bookinstance-list.component.js";
import CreateBookInstance from "./components/update-bookinstance.component.js";
import GenreList from "./components/genre-list.component.js";
import CreateGenre from "./components/update-genre.component.js";


function App() {
 return (
   <Router>
     <div className="main-wrapper">
        <Navbar />
        <div className="container-fluid">
            <div class="row">
                <SideNavbar />
                <br/>
                <Route path="/" exact component={Home} />
                <Route path="/catalog" exact component={Home} />
                <Route path="/catalog/authors" component={AuthorList} />
                <Route path="/catalog/author/create" component={CreateAuthor} />
                <Route path="/catalog/books" component={BookList} />
                <Route path="/catalog/book/create" component={CreateBook} />
                <Route path="/catalog/bookinstances" component={BookInstanceList} />
                <Route path="/catalog/bookinstance/create" component={CreateBookInstance} />
                <Route path="/catalog/genres" component={GenreList} />
                <Route path="/catalog/genre/create" component={CreateGenre} />
            </div>
         </div>
     </div>
   </Router>
 );
}

export default App;