import React, { Component } from 'react';
import factoryImage from './factoryImage.png';

import { withRouter } from "react-router-dom";
// import zoneView from '../zoneView/zoneView';



class PlantView extends Component {
  constructor(props) {
    super(props);
    this.options = {
        responsive: true
    };
    this.state = {
      metricsAndStatus: {},
      zoneName:"",
      status: "",
      lineId: ""
    };
  }

  triggerNavigation = (e) => {
    
    // console.log(lineID)
    this.props.history.push({ pathname: '/zoneView',
    state: {
      zoneId:'zone004'
    } });
    // state : {lineID}
    
    

  }

  triggerZoneViewTable = () => {
    fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialMetrics ')
      .then(resp => resp.json())
      .then(response => {
        this.setState({
        metricsAndStatus:response,
        zoneName: Object.keys(response)
        })
      });
     
  }


  componentDidMount() {
   
    this.triggerZoneViewTable();
   
  
  }

  render() {
    const { zoneName } = this.state;
    
    return (
     
        <div>
          <div className="plant-view-heading">
            <div className="card-heading"><h1>Plant View</h1></div>
          </div>
          <div className="factory-floor-plan">
            <div className="floor-plan-wrapper">
              <div className="zone-details" onClick = {this.triggerNavigation}>
               
                  { zoneName.length > 0  &&
                    <div>
                      
                       <div className="gasket-installation">
                        <div className="headings">{this.state.zoneName[0]}</div>
                        <ul className="main-list">
                          <li className="bullet-and-count">
                            <div className="completed"></div>
                            <div className="count">
                              {this.state.metricsAndStatus[this.state.zoneName[0]][0].count}
                            </div>
                          </li>
                          <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[0]][1].count}</div></li>
                          <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[0]][2].count}</div></li>
                        </ul>
                        <div className="arrow-down"></div>
                      </div>
                      
                    
                      <div className="cooling-system">
                        <h5 className='cooling-heading'>{this.state.zoneName[1]}</h5>
                        <ul className='main-list'>
                          <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[1]][0].count}</div></li>
                          <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[1]][1].count}</div></li>
                          <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[1]][2].count}</div></li>
                        </ul>
                        <div className="cooling-arrow-down"></div>
                      </div>
                      
                      <div className="sheet">
                        <div className="headings">{this.state.zoneName[2]}</div>
                        <ul className='main-list'>
                        <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[2]][0].count}</div></li>
                            <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[2]][1].count}</div></li>
                            <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[2]][2].count}</div></li>
                        </ul>
                        <div className="arrow-down"></div>
                      </div>

                      <div className="cabinet">
                        <div className="headings">{this.state.zoneName[3]}</div>
                        <ul className='main-list'>
                        <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[3]][0].count}</div></li>
                            <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[3]][1].count}</div></li>
                            <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[3]][2].count}</div></li>
                        </ul>
                        <div className="arrow-down"></div>
                      </div>

                      <div className="testing">
                      <div className="headings">{this.state.zoneName[4]}</div>
                      <ul className='main-list'>
                        <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[4]][0].count}</div></li>
                        <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[4]][1].count}</div></li>
                        <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[4]][2].count}</div></li>
                      </ul>
                      <div className="testing-arrow-down"></div>
                    </div>
                  
                  </div>

                }
                
              </div>
              <img  className="factoryImage" src={factoryImage} alt="factoryImage"></img>
            </div>
            
          </div>
          
       
       
        
      </div>
    )
  }
}

export default withRouter(PlantView);
