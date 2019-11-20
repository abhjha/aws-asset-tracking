import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import FadeLoader from 'react-spinners/FadeLoader';

export class ZoneDatatable extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
      isSearchEnabled: true,
      isFilterEnabled: true,
      filterItem: [],
      zoneName: "",
      filteredZoneData: {},
      zoneViewthing: null,
      loading: true
    };
  }

  setStatusStyle(cell, row) {
    let styleClassName = '';
    if (row.status.toLowerCase() === 'completed') {
      styleClassName = 'completed-status';
    } else if (row.status.toLowerCase() === 'in progress') {
      styleClassName = 'in-progress-status';
    } else if (row.status.toLowerCase() === 'waiting') {
      styleClassName = 'waiting-status';
    }
    return `<i class='fas fa-circle statusMarker ${styleClassName}' ></i> ${cell}`;
  }

  triggerZoneViewTable = () => {
    this.setState({loading:true})
    fetch(`https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialHistory?zoneId=${this.props.zoneId}`)
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          loading: false,
          filteredZoneData: response,
          zoneName: response.SelectedZone[0].zoneName
        })
      })
      .catch((err) => {
        this.setState({
          loading: false,
          filteredZoneData:{SelectedZone:[]},
          zoneName:''
        })
    });
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.zoneId !== this.props.zoneId) {
      this.triggerZoneViewTable();
    }
  }

  componentDidMount = () => {
    this.triggerZoneViewTable();
    clearInterval(this.triggerZoneViewTable);
    setInterval(this.triggerZoneViewTable, 30000);
  }
  

  render() {
    const { isSearchEnabled} = this.state;
    const options = {
      responsive:true,
      sizePerPage:  10, 
      hideSizePerPage: true,
      onRowClick : (row, columnIndex) => {
        if(columnIndex === 1){
          this.props.triggerPopupOpen()
        }
      }
    };

    return (
      <div>
      <div id="tableGridPanel">
        <div className="alert-zone">
          <div className="alerts-zone-heading">{this.props.zoneName}</div>
        </div>
        <div>
        <div className="tableAndFilterContainer withoutTabs">
          <div className="filterIcons">
            <i className="fas fa-calendar pull-right tableTools" onClick={this.showHideCalendarTool}></i>
            <i className="fas fa-filter pull-right tableTools" onClick={this.showHideFilterTool}></i>
            <i className="fab fa-sistrix pull-right tableTools"
              onClick={(e) => this.options.showSearchTool(e)}></i>
          </div>
         
          <input type="hidden" value={this.state.activeTabKey} />
          <div > 
          <BootstrapTable
            ref='alertsTable' containerClass="alertsTable" data={this.state.filteredZoneData.SelectedZone} striped hover bordered={false} search={isSearchEnabled} multiColumnSearch options={options} pagination >
            <TableHeaderColumn width='80' dataField='statusBox' dataFormat={this.setStatusStyle} border='0'></TableHeaderColumn>
            <TableHeaderColumn width='90' headerAlign='left' dataAlign='center' isKey dataField='materialName' columnClassName='alerts-link'>Material</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='zoneName'  >Material location</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='status' >Status</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center'  dataSort dataField='visitTimein' >Zone In time</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='visitTimeout' >Zone Out time</TableHeaderColumn>
            {/* <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='description' >Description</TableHeaderColumn> */}
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='superviserName' >Supervisor</TableHeaderColumn>
          </BootstrapTable>

          </div>
          
        </div>
        </div>
       
      </div>
      <div className="legends-wrapper">
      <div className="zone-data-table-legends">
          <ul className="zone-legends">
            <li className="zone-bullet-and-count-legends">
              <div className="zone-waiting"></div>
              <div className="zone-data-table-legends-labels">Waiting</div></li>
            <li className="zone-bullet-and-count-legends">
              <div className="zone-in-progress"></div>
              <div className="zone-data-table-legends-labels">In Progress</div></li>
            <li className="zone-bullet-and-count-legends">
              <div className="zone-completed"></div>
              <div className="zone-data-table-legends-labels">Completed</div></li>
          </ul>
           </div>
      </div>
      
      </div>
    );
  }
}

export default ZoneDatatable;

