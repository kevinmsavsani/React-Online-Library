
import React, { Component } from 'react';
 import DatePicker from 'react-datepicker';
 import "react-datepicker/dist/react-datepicker.css";

export default class UpdateAuthor extends Component {
    constructor(props) {
     super(props);

     this.onChangeUsername = this.onChangeUsername.bind(this);
     this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
     this.onChangeDeathDate = this.onChangeDeathDate.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
       username: '',
       birthDate: new Date(),
       deathDate: new Date(),
       users: []
     };
   }

   onChangeUsername(e){
     this.setState({
       username: e.target.value
     })
   }

   onChangeBirthDate(birthDate) {
     this.setState({
       birthDate: birthDate
     })
   }

   onChangeDeathDate(deathDate) {
     this.setState({
       deathDate: deathDate
     })
   }

   onSubmit(e) {
     e.preventDefault();

     const author = {
       username: this.state.username,
       birthDate: this.state.birthDate,
       deathDate: this.state.deathDate
     }

     console.log(author);

     window.location = '/';
   }

   render() {
     return (
     <div>
       <h3>Add Author</h3>
       <form onSubmit={this.onSubmit}>
         <div className="form-group">
           <label>Username: </label>
           <select ref="userInput"
               required
               className="form-control"
               value={this.state.username}
               onChange={this.onChangeUsername}>
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
           <label>Birth Date: </label>
           <div>
                <DatePicker
                  selected={this.state.birthDate}
                  onChange={this.onChangeBirthDate}
                />
          </div>
         </div>
         <div className="form-group">
           <label>Death Date: </label>
           <div>
             <DatePicker
               selected={this.state.deathDate}
               onChange={this.onChangeDeathDate}
             />
           </div>
         </div>

         <div className="form-group">
           <input type="submit" value="Create Author" className="btn btn-primary" />
         </div>
       </form>
     </div>
     )
   }
 }