import React, { Component } from 'react';
import './PlantView.css';
import factoryImage from './factoryImage.png';
import mapLocation from './mapLocation.png';
import { withRouter } from "react-router-dom";

class PlantView extends Component {

  triggerNavigation = () => {
    this.props.history.push({ pathname: '/zoneView' }); 
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
             <img onClick = {this.triggerNavigation} className="factoryImage" src={factoryImage} alt="factoryImage"></img>
          </div>
         
        </div>
    )
  }
}

export default withRouter(PlantView);
