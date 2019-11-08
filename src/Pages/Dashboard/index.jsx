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
      isModalOpen: false
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
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
   
    const filteredData = [
      {
        "id": "1",
        "status": "warning",
        "statusBox": "",
        "dateTime": "1234",
        "activeTime": "431",
        "description": "987",
        "parameter": "987",
        "location": "qwer"
      },

      {
        "id": "2",
        "status": "critical",
        "statusBox": "",
        "dateTime": "126",
        "activeTime": "432",
        "description": "987",
        "parameter": "987",
        "location": "qwer"
      },
      { "id": "3", "status": "warning", "statusBox": "", "dateTime": "125", "activeTime": "434", "description": "987", "parameter": "987", "location": "qwer" },
      { "id": "4", "status": "non-critical", "statusBox": "", "dateTime": "124", "activeTime": "435", "description": "987", "parameter": "987", "location": "qwer" }
    ]
   
    return (
      < div className="data-container dashboard ">
        {/* <div className="db-header-label ">
          DASHBOARD
        </div> */}
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
            <DataTableComponent filteredData={filteredData} triggerPopupOpen={this.openModal} />
          </div>
          {this.state.isModalOpen && <AlertPopup />}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
