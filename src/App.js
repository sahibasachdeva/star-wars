import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Search from './Search';
import Details from './Details';


class App extends Component{
  render(){
    return(
    <Router>
      <div>
        <Route path="/" exact component = {Login}/>
        <Route path="/search" component = {Search}/>
        <Route path="/Details" component = {Details}/>
      </div>
    </Router>
    );
  }
}

export default App;