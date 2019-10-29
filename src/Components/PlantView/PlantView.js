import React, { Component } from 'react';
import './PlantView.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import factoryImage from './factoryImage.png';
import mapLocation from './mapLocation.png';
import {zoneView} from '../../Components/zoneView/zoneView';

class PlantView extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      
    }
    
  }

  render() {
   
    return (
     
        <div>
          <div className="plant-view-heading">
          
          
          <img className="mapImage" src={mapLocation} alt="mapLocation"></img>
          <div className="main-heading">PLANT VIEW</div>
          
          </div>
          
            <div>
            {/* <Route path="/zoneView" exact component={zoneView} /> */}
          <img className="factoryImage" src={factoryImage} alt="factoryImage"></img>
          </div>
         
        </div>
        
          
        

          
    )
  }
}



export default PlantView;