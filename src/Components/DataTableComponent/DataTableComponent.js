import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './dataTableComponent-dep.css';

export class DataTableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.options = {
      responsive: true
    };
    this.state = {
      isSearchEnabled: true,
      isFilterEnabled: true,
      filterItem: [],
      filteredData: props.filteredData,
      filteredZoneData: props.filteredZoneData
    };
  }

  setStatusStyle(cell, row) {
    let styleClassName = '';
    if (row.status.toLowerCase() === 'critical') {
      styleClassName = 'text-danger';
    } else if (row.status.toLowerCase() === 'non-critical') {
      styleClassName = 'text-primary';
    } else if (row.status.toLowerCase() === 'warning') {
      styleClassName = 'text-warning';
    }
    return `<i class='fas fa-circle statusMarker ${styleClassName}'></i> ${cell}`;
  }

  render() {
    const { isSearchEnabled } = this.state;
    return (
      <div id="tableGridPanel">
        <div className="alert-zone">
          
          <div className="card-heading"><h1>Alerts</h1></div>
        </div>

        <div className="tableAndFilterContainer withoutTabs">
          <div className="filterIcons">
            <i className="fas fa-calendar pull-right tableTools" onClick={this.showHideCalendarTool}></i>
            <i className="fas fa-filter pull-right tableTools" onClick={this.showHideFilterTool}></i>
            <i className="fab fa-sistrix pull-right tableTools"
              onClick={(e) => this.options.showSearchTool(e)}></i>
          </div>
          <input type="hidden" value={this.state.activeTabKey} />
          <div onClick={this.props.triggerPopupOpen}> 
            <BootstrapTable
              ref='alertsTable' containerClass="alertsTable" data={this.state.filteredData} striped hover bordered={false} search={isSearchEnabled} multiColumnSearch options={this.options}>
              <TableHeaderColumn width='30' dataField='statusBox' dataFormat={this.setStatusStyle} border='0'></TableHeaderColumn>
              <TableHeaderColumn width='90' headerAlign='center' dataAlign='center' isKey dataField='id' dataFormat={this.alertDetails}>Material</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataSort dataField='dateTime' >Zone</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='status' >Status</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='activeTime'>Standard Time</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='description'>Actual Time</TableHeaderColumn>
            </BootstrapTable>
          </div>
      
        </div>
        {/* <div className="legends">
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
          </ul>
        </div> */}
      </div>
    );
  }

}

export default DataTableComponent;

