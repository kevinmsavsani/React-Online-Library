import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import AuthorList from "./components/author-list.component";
import CreateAuthor from "./components/update-author.component";
import BookList from "./components/book-list.component";
import CreateBook from "./components/update-book.component";
import BookInstanceList from "./components/bookinstance-list.component";
import CreateBookInstance from "./components/update-bookinstance.component";
import GenreList from "./components/genre-list.component";
import CreateGenre from "./components/update-genre.component";


function App() {
 return (
   <Router>
     <div className="container">
        <Navbar />
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
   </Router>
 );
}

export default App;