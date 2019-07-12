import React from 'react';
import './App.css';

class Login extends React.Component{
  constructor(props){
  super(props);
  this.state = {
    userName : "",
    password : "" ,
    //contacts: []
  }
  this.submit = this.submit.bind(this);
}
submit(){
  fetch ("https://swapi.co/api/people/?search=" + this.state.userName)
  .then(res => res.json())
  .then(result => {
    result = result.results.filter(item => item.name.toString().toLowerCase() === this.state.userName.toString().toLowerCase() && item.birth_year === this.state.password);
 if (result.length > 0)
 {
  localStorage.setItem('signed', true);
  this.props.history.push("Search");
 }
 else{
  window.alert("I find your lack of remembering userName/password disturbing!")
 }
})
}

handleChange = ({ target }) => {
  this.setState({ [target.name]: target.value });
};

  render(){
    localStorage.removeItem('signed');
    return(
      <div className="login">
        {/* <img src= {require("./gradient-background.png")} class= "Img"></img> */}
        <input type="text" name="userName" placeholder="Username" value = {this.state.userName} onChange = {this.handleChange}/>
        <input type="password" name = "password" placeholder="Password" value = {this.state.password} onChange = {this.handleChange}/>
        <button type="submit" name = "submit" className="btn btn-primary btn-block btn-large" onClick= {this.submit}>Do or Do not! there is no try</button>
        {/* <h3 style={forgottenPassword} value= {this.forgottenPassword}> I find your lack of remembering userName/password disturbing!</h3> */}
        </div>
    )
  }
}


export default Login;
