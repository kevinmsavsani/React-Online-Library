
import React, { Component } from 'react';
import axios from 'axios';
 import DatePicker from 'react-datepicker';
 import "react-datepicker/dist/react-datepicker.css";

export default class UpdateBookInstance extends Component {

    constructor(props) {
     super(props);

     this.onChangeBook = this.onChangeBook.bind(this);
     this.onChangeImprint = this.onChangeImprint.bind(this);
     this.onChangeDate = this.onChangeDate.bind(this);
     this.onChangeStatus = this.onChangeStatus.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
       book: '',
       imprint: '',
       status: '',
       date: new Date(),
       statusName: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
       books: [],
       bookid: []
     };
   }

   componentDidMount() {
        axios.get('http://localhost:5000/catalog/books')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                books: response.data.map(book => book.title),
                bookid: response.data.map(book => book._id),
                author: response.data[0].name
              });
            }

          })
          .catch((error) => {
            console.log(error);
          })

        axios.get('http://localhost:5000/catalog/bookinstance/'+this.props.match.params.id)
                 .then(response => {
                   this.setState({
                     book: response.data.book.title,
                     imprint: response.data.imprint,
                     status: response.data.status,
                     date: new Date(response.data.due_back),
                   })
                 })
                 .catch(function (error) {
                   console.log(error);
                 })

   }

   onChangeBook(e){
     this.setState({
       book: e.target.value
     })
   }

   onChangeImprint(e) {
     this.setState({
       imprint: e.target.value
     })
   }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeStatus(e){
    this.setState({
      status: e.target.value
    })
  }

   onSubmit(e) {
     e.preventDefault();

     const bookInstance = {
       book: this.state.bookid[this.state.books.indexOf(this.state.book)],
       imprint: this.state.imprint,
       due_back: this.state.date,
       status: this.state.status
     }
     axios.post('http://localhost:5000/catalog/bookinstance/edit/'+this.props.match.params.id, bookInstance)
      .then(res => console.log(res.data));

     window.location = '/catalog/bookinstance/'+this.props.match.params.id;
   }

   render() {
     return (
     <div>
       <h3>Edit Book Instance</h3>
       <form onSubmit={this.onSubmit}>
         <div className="form-group">
           <label>Book: </label>
           <select ref="userInput"
               required
               className="form-control"
               value={this.state.book}
               onChange={this.onChangeBook}>
               {
                 this.state.books.map(function(book) {
                   return <option
                     key={book}
                     value={book}>{book}
                     </option>;
                 })
               }
           </select>
         </div>

          <div className="form-group">
             <label>Imprint: </label>
             <input  type="text"
                 required
                 className="form-control"
                 value={this.state.imprint}
                 onChange={this.onChangeImprint}
                 />
           </div>
           <div className="form-group">
              <label>Due Date: </label>
              <div>
                   <DatePicker
                     selected={this.state.date}
                     onChange={this.onChangeDate}
                   />
             </div>
            </div>
         <div className="form-group">
               <label>Status: </label>
               <select ref="userInput"
                   required
                   className="form-control"
                   value={this.state.status}
                   onChange={this.onChangeStatus}>
                   {
                     this.state.statusName.map(function(status) {
                       return <option
                         key={status}
                         value={status}>{status}
                         </option>;
                     })
                   }
               </select>
             </div>
         <div className="form-group">
           <input type="submit" value="Edit Book Instance" className="btn btn-primary" />
         </div>
       </form>
     </div>
     )
   }
 }