import React, { Component } from 'react';
import './PlantView.css';
import plantView from './plantView.jpg'
class PlantView extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      
    }
    
  }

  render() {
   
    return (
        <div>
          <img className="plant-view-image" src={plantView} alt="alert"></img>
        </div>
        
          
        

          
    )
  }
}



export default PlantView;