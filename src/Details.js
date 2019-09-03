import React from 'react';
import './App.css';
const details = {
color : '#FFF'
}

class Details extends React.Component
{    constructor(props){
        super(props);
        this.state = {
            deets : []
        }}
        
    render()
    {
        var deets = this.props.location.state.planetDetails1;
        const {name,rotation_period,orbital_period,climate,gravity,surface_water,population,created,url} = deets; 
return(
  <div className= "login">
  <h3> Here are the details for {name} </h3>
  <div> Rotation period :{rotation_period}</div>
  <div> Orbital period :{orbital_period} </div>
  <div> Climate : {climate}</div>
  <div> Gravity : {gravity}</div>
  <div> Surface water  {surface_water}</div>
  <div> Population : {population} </div>
  <div> Created : {created}</div>
  </div>
)
        
    }
}



export default Details