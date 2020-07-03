
import React, { Component } from 'react';

export default class UpdateBook extends Component {
    constructor(props) {
     super(props);

     this.onChangeAuthor = this.onChangeAuthor.bind(this);
     this.onChangeTitle = this.onChangeTitle.bind(this);
     this.onChangeSummary = this.onChangeSummary.bind(this);
     this.onChangeIsbn = this.onChangeIsbn.bind(this);
     this.onChangeGenre = this.onChangeGenre.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
       author: '',
       title: '',
       summary: '',
       genre: '',
       isbn:'',
       users: []
     };
   }

   onChangeAuthor(e){
     this.setState({
       author: e.target.value
     })
   }

   onChangeTitle(e) {
     this.setState({
       title: e.target.value
     })
   }

   onChangeSummary(e) {
     this.setState({
       summary: e.target.value
     })
   }

  onChangeIsbn(e) {
    this.setState({
      isbn: e.target.value
    })
  }

  onChangeGenre(e){
    this.setState({
      genre: e.target.value
    })
  }

   onSubmit(e) {
     e.preventDefault();

     const book = {
       author: this.state.author,
       title: this.state.title,
       summary: this.state.summary,
       isbn: this.state.isbn,
       genre: this.state.genre
     }

     console.log(book);

     window.location = '/catalog/books';
   }

   render() {
     return (
     <div>
       <h3>Add Book</h3>
       <form onSubmit={this.onSubmit}>
           <div className="form-group">
             <label>Title: </label>
             <input  type="text"
                 required
                 className="form-control"
                 value={this.state.title}
                 onChange={this.onChangeTitle}
                 />
           </div>
         <div className="form-group">
           <label>Author: </label>
           <select ref="userInput"
               required
               className="form-control"
               value={this.state.author}
               onChange={this.onChangeAuthor}>
               {
                 this.state.users.map(function(user) {
                   return <option
                     key={user}
                     value={user}>{user}
                     </option>;
                 })
               }
           </select>
         </div>

          <div className="form-group">
             <label>Summary: </label>
             <input  type="text"
                 required
                 className="form-control"
                 value={this.state.summary}
                 onChange={this.onChangeSummary}
                 />
           </div>
           <div className="form-group">
            <label>ISBN: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.isbn}
                onChange={this.onChangeIsbn}
                />
          </div>
         <div className="form-group">
               <label>Genre: </label>
               <select ref="userInput"
                   required
                   className="form-control"
                   value={this.state.genre}
                   onChange={this.onChangeGenre}>
                   {
                     this.state.users.map(function(user) {
                       return <option
                         key={user}
                         value={user}>{user}
                         </option>;
                     })
                   }
               </select>
             </div>
         <div className="form-group">
           <input type="submit" value="Create Book" className="btn btn-primary" />
         </div>
       </form>
     </div>
     )
   }
 }