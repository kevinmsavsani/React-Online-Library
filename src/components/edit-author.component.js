
import React, { Component } from 'react';
import axios from 'axios';
 import DatePicker from 'react-datepicker';
 import "react-datepicker/dist/react-datepicker.css";

export default class EditAuthor extends Component {
    constructor(props) {
     super(props);

     this.onChangeAuthor = this.onChangeAuthor.bind(this);
     this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
     this.onChangeDeathDate = this.onChangeDeathDate.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
       author: '',
       birthDate: new Date(),
       deathDate: new Date()
     };
   }

   componentDidMount() {
       axios.get('http://localhost:5000/catalog/author/'+this.props.match.params.id)
         .then(response => {
           this.setState({
             author: response.data.name,
             birthdate: new Date(response.data.date_of_birth),
             deathDate: new Date(response.data.date_of_death)
           })
         })
         .catch(function (error) {
           console.log(error);
         })
     }

   onChangeAuthor(e){
     this.setState({
       author: e.target.value
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
       name: this.state.author,
       date_of_birth: this.state.birthDate,
       date_of_death: this.state.deathDate
     }

     console.log(author);

     axios.post('http://localhost:5000/catalog/author/edit/'+this.props.match.params.id, author)
       .then(res => console.log(res.data));

     window.location = '/catalog/author/'+this.props.match.params.id;
   }

   render() {
     return (
     <div>
       <h3>Edit Author</h3>
       <form onSubmit={this.onSubmit}>
         <div className="form-group">
          <label>Author Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
              />
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
           <input type="submit" value="Edit Author" className="btn btn-primary" />
         </div>
       </form>
     </div>
     )
   }
 }