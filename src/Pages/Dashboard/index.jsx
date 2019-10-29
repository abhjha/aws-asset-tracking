import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Chart from 'chart.js';
import { DataTableComponent } from '../../Components/DataTableComponent/DataTableComponent';
import AssetMetrics from '../../Components/AssetMetrics/AssetMetrics';
import PlantView from '../../Components/PlantView/PlantView';
import AlertPopup from '../../Components/AlertPopup/AlertPopup';

import './index.css';
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

  render() {
    const data = {
      labels: ['ZONE 1', 'ZONE 2', 'ZONE 3', 'ZONE 4', 'ZONE 5'],
      datasets: [
        {
          label: 'In Progress',
          data: [1000, 200, 1500, 500, 200, 600],
          backgroundColor: 'rgb(250,85,63)',
          borderWidth: 1
        },
        {
          data: [800, 400, 500, 430, 180, 1000],
          label: 'Working',

          backgroundColor: 'rgb(251,188,0)'
        },
        {
          data: [400, 400, 50, 600, 1700, 900],
          label: 'Completed',
          backgroundColor: 'rgb(3,160,69)'
        }

      ]
    };
    return (
      < div className="data-container dashboard">
        <div className="db-header-label">
          DASHBOARD
        </div>
        <div className="db-data">
          <div className="db-data-values">
            <div className="db-data-metrics">
              <AssetMetrics
                data={data} />
            </div>
            <div className="db-plant-view">
              <PlantView />
            </div>
          </div>
          <div className="db-alerts">
            <DataTableComponent triggerPopupOpen={this.openModal} />
          </div>
          {this.state.isModalOpen && <AlertPopup />}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
