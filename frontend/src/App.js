import React, { Component } from "react";

import "./App.css";
import { NavLink, Link } from "react-router-dom";
import "antd/dist/antd.css";
import Routes from "./Routes";
import axios from "axios";
import * as toastr from 'toastr';
import { withRouter } from 'react-router-dom'
      

class App extends Component {
  state = {
    isLogged: false,
    user: {},

  };

  checkLogged() {
  axios
  .get("https://foodie-el-app.herokuapp.com/private", { withCredentials: true })
  .then(res => {
    this.setState({ isLogged: true , user : res.data.user});
    this.render();
  })
  .catch(e => {
    this.setState({ isLogged: false });
    this.render();
  });
};
  navDraw() {
    let { isLogged } = this.state;
    
    if (!isLogged) {
      return (
        <div className="app-container">
          <nav className="navbar-1">
            <NavLink to="/login">Log in</NavLink>
            <Link to="/">
          <img height="68"src="https://res.cloudinary.com/dpt8pbi8n/image/upload/v1551978138/logo.png" alt="logo"/>
          </Link>
            <NavLink to="/signup">Sign up</NavLink>
          </nav>

        
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <nav className="navbar-2">
          <Link to="/">
          <img height="68" src="https://res.cloudinary.com/dpt8pbi8n/image/upload/v1551978138/logo.png" alt="logo"/>            
           </Link>
            <NavLink to="/home">Home</NavLink>
            {"|"}
            <NavLink to="/profile">Profile</NavLink>
            {"|"}
            <NavLink className="logout-press" to={"/logout"}>Logout</NavLink>
            
          </nav>
=
     
        </div>
      );
    }
  }

  componentDidMount = () => {
    this.checkLogged()
  }

  logIn = auth => {
    toastr.options = {
      "positionClass": "toast-bottom-full-width",

    }

    const urlLog = "https://foodie-el-app.herokuapp.com/login"
    axios
      .post(urlLog, auth, { withCredentials: true })
      .then(res => {
        // this.props.history.push('/profile')
        
        this.setState({ isLogged: true , user:res.data })
      })
      .catch(e => {
        console.log(e)
        toastr.error('Email or Password fields incorrect')
      });
  };

  logOut = () => {
    const url = "https://foodie-el-app.herokuapp.com/logout"
    axios.get(url, {withCredentials:true})
    .then(()=>{
        this.setState({isLogged:false})
        this.props.history.push('/')
       
        // this.render()
    })
    .catch((e)=>console.log(e))
}

  render() {
    const { isLogged ,user } = this.state;
    // if(!isLogged){
    //   return(
    //     <div>
        
    // {this.navDraw()}
    //     </div>
    //   )
    // }
    return <div className="App">

    {this.navDraw()}
    
    <Routes isLogged={isLogged} logOut={this.logOut} logIn={this.logIn} map={this.mapContainer} user={user} />
   
      

    </div>;
  }
}

export default withRouter(App);
