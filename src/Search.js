import React from 'react'
import './App.css'
import {Progress} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {debounce} from 'lodash'
const searchbar = {
    top : '30%',
    color : '#FFF'
};

const signout = {
    marginLeft : '150%'
}

class Search extends React.Component
{
constructor(props){
    super(props);
    this.state = {
        planetName : "",
        planetPopulation : "",
        planetResult : [],
        planetDetails : null,
        searchAllowed : true
    };

    this.handleSignout = this.handleSignout.bind(this);
    this.details = this.details.bind(this);
    this.handleSearchInput =  this.handleSearchInput.bind(this);

    this.updateSearchResult = this.updateSearchResult.bind(this);
}

handleSignout(){
window.localStorage.clear();
    
    this.props.history.push("/");

  }
handleSearchInput(event){
    event.preventDefault();
    this.setState({ planetName: event.target.value });
    return this.updateSearchResult(event.target.value)
}

updateSearchResult = debounce(async (value) =>
   {
       let searchCount = localStorage.getItem('SearchCount');
       let userName = localStorage.getItem('userName');
       if(!userName){
          return this.props.history.push('/')
       }
       if (!searchCount) {
           searchCount = {
               searchCount: 1,
               time: new Date().getTime()
           }
           this.state.searchAllowed = true;
           localStorage.setItem("SearchCount", JSON.stringify(searchCount));
       } else {
           searchCount = JSON.parse(searchCount);
        //   userData = JSON.parse(userData);
           let timeCheck = (new Date() < new Date(searchCount.time).setMinutes(new Date(searchCount.time).getMinutes() + 1));
           if (timeCheck && searchCount.searchCount >= 5 && userName.name.toString().toLowerCase() !== "luke skywalker") {
               this.state.searchAllowed = false;
               window.alert("you ain't so privileged");
           } else {
               this.state.searchAllowed = true;
               if (!timeCheck) {
                   searchCount.time = new Date().getTime();
                   searchCount.searchCount = 1;
               } else {
                   searchCount.searchCount++;
               }
               localStorage.setItem("SearchCount", JSON.stringify(searchCount));
           }
       }
       if (this.state.searchAllowed) {
           this.state.searchAllowed = true;
           fetch('https://swapi.co/api/planets/?search='+this.state.planetName)
           .then(responseJson => responseJson.json())
           .then(result => {      
               result.results.map((item, index) =>{
                   if(item.population==="unknown"){
                       item.population=1000;
                   }
               })
               this.setState({'planetResult':result.results});
           })
   }
   },750)


details(e, itemName)
{
    for (var i = 0; i < this.state.planetResult.length; i++) {
        if (itemName == this.state.planetResult[i].name) {
            this.setState({ planetDetails: this.state.planetResult[i]});
        }
    }
}

render(){
    if (this.state.planetDetails != null) {
        this.props.history.push({
            pathname: 'Details',
            state: { planetDetails1: this.state.planetDetails }
        });
     }
    this.state.planetResult.sort((a,b) => (Number(a.population) > Number(b.population)) ? 1 : -1);
    if(localStorage.getItem('signed') == "false" || localStorage.getItem('signed') == null)
    this.props.history.push("/");
    return(   
<div className = "login" style={searchbar}>
<button type="submit" name = "submit" className="btn btn-primary btn-block btn-large" onClick= {this.handleSignout} style={signout}> Wanna get out? </button>
    <input type="text" placeholder="Power! Unlimited power! Search it out" name="planetName" value={this.state.planetName} onChange={e => this.handleSearchInput(e,"planetName")}></input>
    <center > 
        {
            this.state.planetResult.map((planetResult, index) => (
                <li onClick = {e => this.details(e, planetResult.name)}> {planetResult.name}  
                <div>
                    <p> {planetResult.population} </p>
                </div>
                <Progress success value={planetResult.population/100000000}/>
                </li>
            )) 
        } 
    </center>
</div>
    );

}
}
export default Search
