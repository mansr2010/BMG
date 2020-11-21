import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
var md5 = require('md5');


export default class CreateUser extends Component {
    constructor(props) {
        super(props);
       
        this.onChangeUsername = this.onChangeUsername.bind(this); 
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this); 
        this.onChangePassword = this.onChangePassword.bind(this); 
        this.onChangeImage = this.onChangeImage.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            fullname: '',
            birthdate: new Date(),
            email:'',
            password:'',
            pimage:''
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeFullname(e){
        this.setState({
            fullname: e.target.value
        })
    }

    onChangeBirthdate(date){
        this.setState({
            birthdate: date
        })
    }

    onChangeEmail(e){
            this.setState({
                email: e.target.value
            })
    }

    onChangePassword(e){

        
        this.setState({

            password: e.target.value
        })
    }

    onChangeImage(e){
        this.setState({

            pimage: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username:   this.state.username,
            fullname:   this.state.fullname,
            birthdate:  this.state.birthdate,
            email:      this.state.email,
            password:   md5(this.state.password),
            pimage:     this.state.pimage,
        }

        

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

       window.location='/';
    }
    render(){
        return (
            <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="form-group"> 
                <label>Full Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.fullname}
                    onChange={this.onChangeFullname}
                    />
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input
                    type="email" 
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input 
                    type="password" 
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>
              <div className="form-group">
                <label>Birth date: </label>
                <div>
                  <DatePicker
                    selected={this.state.birthdate}
                    onChange={this.onChangeBirthdate}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Profile Picture: </label>
                <input 
                    type="file" 
                    accept="image/x-png,image/gif,image/jpeg"
                    className="form-control"
                    value={this.state.pimage}
                    onChange={this.onChangeImage}
                    />
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
              </div>
            </form>
          </div>

        )
    }
}