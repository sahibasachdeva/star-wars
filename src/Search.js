import React from 'react'
import './App.css'

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
        planetDetails : null
    }
    this.handleSignout = this.handleSignout.bind(this);
    this.details = this.details.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
}

handleSignout(){
    localStorage.removeItem('signed');
    this.props.history.push("/");
  }

searchFilter(event){
    event.preventDefault();
    this.setState({ planetName: event.target.value });
    console.log(this.state.planetName);
    fetch('https://swapi.co/api/planets/?search='+this.state.planetName)
    .then(responseJson => responseJson.json())
    .then(result => {result = result.results
      this.setState({'planetResult':result});
})
}

details(e, itemName)
{
    // console.log(itemName);
    for (var i = 0; i < this.state.planetResult.length; i++) {
        if (itemName == this.state.planetResult[i].name) {
           // console.log(this.state.planetResult[i]);
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
    <input type="text" placeholder="Power! Unlimited power! Search it out" name="planetName" value={this.state.planetName} onChange={this.searchFilter}></input>
    <center > 
        {
            this.state.planetResult.map(planetResult => (
                <li onClick = {e => this.details(e, planetResult.name)}> {planetResult.name}  
                <div>
                    <p> {planetResult.population} </p>
                </div>
                </li>
            )) 
        } 
    </center>
</div>
    );

}
}

export default Search
