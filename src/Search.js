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
    this.updateSearchResult = debounce(this.updateSearchResult, 500);
}

handleSignout(){
    localStorage.removeItem('signed');
    this.props.history.push("/");
  }

  updateSearchResult() {
    this.setState({
      planetName: this.state.planetName
    });
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
        let isStillOneMinute = (new Date() < new Date(searchCount.time).setMinutes(new Date(searchCount.time).getMinutes() + 3));
        if (isStillOneMinute && searchCount.searchCount >= 5 && userName !== "luke skywalker") {
            this.state.searchAllowed = false;
            window.alert("You are not so privileged");
        } else {
            this.state.searchAllowed = true;
            if (!isStillOneMinute) {
                searchCount.time = new Date().getTime();
                searchCount.searchCount = 1;
            } else {
                searchCount.searchCount++;
            }
            localStorage.setItem("SearchCount", JSON.stringify(searchCount));
        }
    }


  }

handleSearchInput(event){
    event.preventDefault();
    this.setState({ planetName: event.target.value });
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

    this.updateSearchResult();
}


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
