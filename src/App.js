import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import SideNavbar from "./components/sidenavbar.component.js";
import Home from "./components/home.component.js";
import AuthorList from "./components/author-list.component.js";
import CreateAuthor from "./components/create-author.component.js";
import AuthorDetail from "./components/author-detail.component.js";
import BookList from "./components/book-list.component.js";
import CreateBook from "./components/create-book.component.js";
import BookDetail from "./components/book-detail.component.js";
import BookInstanceList from "./components/bookinstance-list.component.js";
import CreateBookInstance from "./components/create-bookinstance.component.js";
import BookInstanceDetail from "./components/bookinstance-detail.component.js";
import GenreList from "./components/genre-list.component.js";
import CreateGenre from "./components/create-genre.component.js";
import GenreDetail from "./components/genre-detail.component.js";
import EditAuthor from "./components/edit-author.component.js";
import EditBook from "./components/edit-book.component.js";
import EditBookInstance from "./components/edit-bookinstance.component.js";
import EditGenre from "./components/edit-genre.component.js";

function App() {
 return (
   <Router>
     <div className="main-wrapper">
        <Navbar />
        <div className="container-fluid">
            <div className="row">
                <SideNavbar />
                <div className="col-sm-9">
                    <br/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/catalog" exact component={Home} />
                        <Route path="/catalog/authors" component={AuthorList} />
                        <Route path="/catalog/author/create" exact component={CreateAuthor} />
                        <Route path="/catalog/books" component={BookList} />
                        <Route path="/catalog/book/create" exact component={CreateBook} />
                        <Route path="/catalog/bookinstances" component={BookInstanceList} />
                        <Route path="/catalog/bookinstance/create" exact component={CreateBookInstance} />
                        <Route path="/catalog/genres" component={GenreList} />
                        <Route path="/catalog/genre/create" exact component={CreateGenre} />
                        <Route path="/catalog/genre/edit/:id" component={EditGenre} />
                        <Route path="/catalog/book/edit/:id" component={EditBook} />
                        <Route path="/catalog/author/edit/:id" component={EditAuthor} />
                        <Route path="/catalog/bookinstance/edit/:id" component={EditBookInstance} />
                        <Route path="/catalog/genre/:id" component={GenreDetail} />
                        <Route path="/catalog/book/:id" component={BookDetail} />
                        <Route path="/catalog/author/:id" component={AuthorDetail} />
                        <Route path="/catalog/bookinstance/:id" component={BookInstanceDetail} />
                    </Switch>
                    </div>
            </div>
         </div>
     </div>
   </Router>
 );
}

export default App;