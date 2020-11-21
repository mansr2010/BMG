
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Usersdata = props => (
    //eslint-disable-line no-use-before-define
    <tr>
      <td>{props.user.username}</td>
      <td>{props.user.fullname}</td>
      <td>{props.user.email}</td>
      <td>{props.user.birthdate.substring(0,10)}</td>
      <td>{props.user.password}</td>
      <td>{props.user.pimage}</td>
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a> 
      </td>
    </tr>
  )


export default class UsersList extends Component {
    
    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = {users: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({users: response.data})
            })
            .catch((error) => {
               console.log(error); 
            })
    }

    deleteUser(id){
        axios.delete ('http://localhost:5000/users/'+id)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userslist(){
        return this.state.users.map(users => {
            return <Usersdata user={users} deleteUser={this.deleteUser} key={users._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>Users List</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Birth Date</th>
                    <th>Password</th>
                    <th>Image</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.userslist() }
                </tbody>
                </table>
            </div>
        )
    }
}