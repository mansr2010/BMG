import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import UsersList from "./components/user-list.component";
import CreateUser from "./components/edit-user.component";
import AddUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={UsersList} /> 
        <Route path="/edit/:id" exact component={CreateUser} />
        <Route path="/create" exact component={AddUser} />
        </div>
    </Router>
  );
}

export default App;
