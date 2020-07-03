
import React, { Component } from 'react';

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
       date:new Date(),
       statusName: [],
       books: []
     };
   }

   componentDidMount() {
     this.setState({
       statusName: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
       status: 'Maintenance'
     });
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
       book: this.state.book,
       imprint: this.state.imprint,
       date: this.state.date,
       status: this.state.status
     }

     console.log(bookInstance);

     window.location = '/catalog/bookinstances';
   }

   render() {
     return (
     <div>
       <h3>Add Book Instance</h3>
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
           <input type="submit" value="Create Book Instance" className="btn btn-primary" />
         </div>
       </form>
     </div>
     )
   }
 }