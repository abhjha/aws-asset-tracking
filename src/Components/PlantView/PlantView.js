import React, { Component } from 'react';
import factoryImage from './factoryImage.png';
import { withRouter } from "react-router-dom";

class PlantView extends Component {
  constructor(props) {
    super(props);
    this.options = {
      responsive: true
    };
    this.state = {
      metricsAndStatus: {},
      zoneName: "",
      status: "",
      
    };
  }

  triggerNavigation = (e) => {
    const zoneId = e.currentTarget.getAttribute('data-id');
    const zoneViewName = e.currentTarget.childNodes[0].innerText;
    
    this.props.history.push({
      pathname: '/zoneView',
      state: {
        zoneId:zoneId,
        zoneViewName : zoneViewName
       
      },
    });
  }

  triggerFactoryFloorPlan = () => {
    fetch('https://nratrxpc82.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialMetrics ')
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          metricsAndStatus: response,
          zoneName: Object.keys(response)
        })
      });

  }
  
  componentDidMount() {

    this.triggerFactoryFloorPlan();
    clearInterval(this.triggerFactoryFloorPlan);
    setInterval(this.triggerFactoryFloorPlan, 3000);
  }

  render() {
    const { zoneName } = this.state;

    return (

      <div>
        <div className="plant-view-heading">
          <div className="card-heading"><h1>Factory Floor</h1></div>
        </div>
        <div className="factory-floor-plan">
          <div className="floor-plan-wrapper">
            <div className="zone-details">

              {zoneName.length > 0 &&
                <div>
                  <div className="quality-insurance" data-id={this.state.metricsAndStatus[this.state.zoneName[4]][0].zoneId}  onClick={this.triggerNavigation}>
                    <div className="headings">{this.state.zoneName[4]}</div>
                    <ul className='main-list'>
                      <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[4]][2].count}</div></li>
                      <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[4]][1].count}</div></li>
                      <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[4]][0].count}</div></li>
                     
                    
                    </ul>
                    <div className="arrow-down"></div>
                  </div>

                  <div className="paint-shop" data-id={this.state.metricsAndStatus[this.state.zoneName[3]][0].zoneId} onClick={this.triggerNavigation}>
                    <div className="headings">{this.state.zoneName[3]}</div>
                    <ul className='main-list'>
                    <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[3]][2].count}</div></li>
                      <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[3]][1].count}</div></li>
                      <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[3]][0].count}</div></li>
                    </ul>
                    <div className="arrow-down"></div>
                  </div>

                  <div className="piping-and-cooling-shop" data-id={this.state.metricsAndStatus[this.state.zoneName[2]][0].zoneId} onClick={this.triggerNavigation}>
                    <div className="headings">{this.state.zoneName[2]}</div>
                    <ul className="main-list">
                    <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[2]][2].count}</div></li>
                      <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[2]][1].count}</div></li>
                      <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[2]][0].count}</div></li>
                    </ul>
                    <div className="arrow-down"></div>
                  </div>
                  

                  <div className="vaccum-foaming-shop" data-id={this.state.metricsAndStatus[this.state.zoneName[1]][0].zoneId} onClick={this.triggerNavigation}>
                    <div className='headings'>{this.state.zoneName[1]}</div>
                    <ul className='main-list'>
                    <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[1]][2].count}</div></li>
                      <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[1]][1].count}</div></li>
                      <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[1]][0].count}</div></li>
                    </ul>
                    <div className="arrow-down"></div>
                  </div>

                 
                  <div className="metal-shop" data-id={this.state.metricsAndStatus[this.state.zoneName[0]][0].zoneId} onClick={this.triggerNavigation}>
                    <div className="headings">{this.state.zoneName[0]}</div>
                    <ul className='main-list'>
                    <li className="bullet-and-count"><div className="waiting"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[0]][2].count}</div></li>
                      <li className="bullet-and-count"><div className="in-progress"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[0]][1].count}</div></li>
                      <li className="bullet-and-count"><div className="completed"></div><div className="count">{this.state.metricsAndStatus[this.state.zoneName[0]][0].count}</div></li>
                    </ul>
                    <div className="arrow-down"></div>
                  </div>

                </div>
              }
            </div>
            
          <div>
            <img className="factoryImage" src={factoryImage} alt="factoryImage"></img>
          </div>
        </div>
      </div>
      <div className="legends">
                <ul>
                      <li className="bullet-and-count-legends">
                      <div className="waiting"></div>
                        <div className="legends-labels">Waiting</div></li>
                      <li className="bullet-and-count-legends">
                        <div className="in-progress"></div>
                        <div className="legends-labels">In Progress</div></li>
                      <li className="bullet-and-count-legends">
                      <div className="completed"></div>
                        <div className="legends-labels">Completed</div></li>
                       
                      </ul></div>
          </div>
    )
  }
}

export default withRouter(PlantView);
