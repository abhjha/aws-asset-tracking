import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Chart from 'chart.js';
import { DataTableComponent } from '../../Components/DataTableComponent/DataTableComponent';
import AssetMetrics from '../../Components/AssetMetrics/AssetMetrics';
import PlantView from '../../Components/PlantView/PlantView';
import AlertPopup from '../../Components/AlertPopup/AlertPopup';

Chart.defaults.global.legend.labels.usePointStyle = true;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      alertPopUpName: "",
      zoneName: "",
      status: ""
     
    }
  }

  openModal = () => {
     // eslint-disable-next-line no-restricted-globals
     const alertPopUpName = event.path[1].cells[1].innerText;
      // eslint-disable-next-line no-restricted-globals
     const zoneName=event.path[1].cells[2].innerText;
      // eslint-disable-next-line no-restricted-globals
      const status=event.path[1].cells[3].innerText;
       // eslint-disable-next-line no-restricted-globals
       const timeStamp=event.path[1].cells[4].innerText;
       // eslint-disable-next-line no-restricted-globals
       const description=event.path[1].cells[5].innerText;
      
   
    
  
    this.setState({ 
      alertPopUpName:alertPopUpName,
      zoneName:zoneName,
      status:status,
      timeStamp:timeStamp,
      description:description,
      isModalOpen: !this.state.isModalOpen,
      
    })
  }
  closeModal=()=> {
    
      
   
     this.setState({ 
       
       isModalOpen: !this.state.isModalOpen,
       
     })
   
  }

  setMenuActiveState =() => {
    var pageId = document.getElementsByClassName("dashboard");
    if(pageId.length > 0){
      document.getElementsByClassName('menu-heading-container')[0].classList.add('active');
      document.getElementsByClassName('menu-heading-container')[1].classList.remove('active');
    }else{
      document.getElementsByClassName('menu-heading-container')[0].classList.remove('active');
      document.getElementsByClassName('menu-heading-container')[1].classList.add('active');
    }
  }

  triggerAssetMetricsGraphData = () => {
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
    this.triggerAssetMetricsGraphData();
    this.setMenuActiveState();
  }

  render() {
    return (
      < div className="data-container dashboard ">
        <div className="db-data">
          <div className="db-data-values ">
            <div className="db-data-metrics ">
              <AssetMetrics
                 />
            </div>
            <div className="db-plant-view card-tile ">
              <PlantView />
            </div>
          </div>
          <div className="db-alerts card-tile ">
            <DataTableComponent  triggerAlertPopupOpen={this.openModal} />
          </div>
          {this.state.isModalOpen ?  <AlertPopup
           closeWindow={this.closeModal.bind(this)}

           alertPopUpName= {this.state.alertPopUpName}
           zoneName={this.state.zoneName}
           status={this.state.status}
           timeStamp={this.state.timeStamp}
           description={this.state.description} /> : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
