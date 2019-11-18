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
    if (row.STATUS.toLowerCase() === 'in progress') {
      styleClassName = 'in-progress-status';
    } else if (row.STATUS.toLowerCase() === 'completed') {
      styleClassName = 'completed-status';
    } else if (row.STATUS.toLowerCase() === 'waiting') {
      styleClassName = 'waiting-status';
    }
    return `<i class='fas fa-circle statusMarker ${styleClassName}'></i> ${cell}`;
  }
  triggerAlertDatatable = () => {
    fetch(`https://b7h0jkep5i.execute-api.us-west-2.amazonaws.com/Stage/GetAlertDetails`)
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          alertDatatableData: response
        })
      })
  }
  componentDidMount = () => {
    this.triggerAlertDatatable();
    clearInterval(this.triggerAlertDatatable);
    setInterval(this.triggerAlertDatatable, 30000);

  }

  changeTimeFormat = () => {

  }
  secondsToMilliseconds = (cell,row) =>{
    var currDate = new Date(cell);
    var dateString = (new Date(cell)).toLocaleDateString("en-US", {
      month: 'short',
      day: '2-digit'
                });
    var dateArray = dateString.split(" ");
    dateString = ""+dateArray[1]+" "+dateArray[0];
    var dateHours = currDate.getHours();
    var dateMins = currDate.getMinutes();
    dateString = dateString+" : "+dateHours+":"+dateMins;
    return dateString;
  }
  render() {
    
    const { isSearchEnabled } = this.state;
    const options = {
      responsive: true,
      sizePerPage:  15, 
      sizePerPageList: [ {
        text: '15', value: 5
      }, {
        text: '15', value: 15
      }], 
      onRowClick : (row, columnIndex) => {
        if(columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 ){
          this.props.triggerAlertPopupOpen()
        }
      }
    }
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
         
            <BootstrapTable
              ref='alertsTable' containerClass="alertsTable" data={this.state.alertDatatableData} striped hover bordered={false} search={isSearchEnabled} multiColumnSearch options={options} pagination>
              <TableHeaderColumn width='30' dataField='statusBox' dataFormat={this.setStatusStyle} border='0'></TableHeaderColumn>
              <TableHeaderColumn width='90' headerAlign='center' dataAlign='center' isKey dataField='ASSET_NAME' dataFormat={this.alertDetails}>Material</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataSort dataField='LINE' >Zone</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='STATUS' >Status</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='TIMESTAMP' dataFormat={ this.secondsToMilliseconds } >Time Stamp</TableHeaderColumn>
              <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='ALARM_NAME'>Description</TableHeaderColumn>
            </BootstrapTable>
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

