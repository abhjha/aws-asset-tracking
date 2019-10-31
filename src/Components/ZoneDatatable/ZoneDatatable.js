import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import './dataTableComponent-dep.css';

export class ZoneDatatable extends React.Component {

  constructor(props) {
    super(props);
    this.options = {
        responsive: true
    };
    this.state = {
        isSearchEnabled: true,
        isFilterEnabled: true,
        filterItem : [],
      
        zoneName: "",
        filteredZoneData: {}
    };
  }
  
  setStatusStyle(cell, row){
     let styleClassName = '';
      if(row.status.toLowerCase() === 'critical'){
        styleClassName = 'text-danger';
      } else if(row.status.toLowerCase() === 'non-critical'){
        styleClassName = 'text-primary';
      } else if(row.status.toLowerCase() ==='waiting'){
        styleClassName = 'text-warning';
      }
      return `<i class='fas fa-circle statusMarker ${ styleClassName }' ></i> ${cell}`; 
  }
  triggerZoneViewTable = () => {
    fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialHistory?zoneId=zone001')
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          filteredZoneData: response,
          zoneName: response.SelectedZone[0].zoneName
        })
      });
  }

  componentDidMount = () => {
    this.triggerZoneViewTable();
  }


 render() {
    
  
    const { isSearchEnabled} = this.state; 
   
          return ( 
            
          <div id="tableGridPanel">
            <div className="alert-zone">
           
            <div className="alerts-zone-heading">{this.state.zoneName}</div>
            
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
                            ref='alertsTable' containerClass="alertsTable" data={this.state.filteredZoneData.SelectedZone}  striped hover bordered={ false } search={isSearchEnabled} multiColumnSearch options={ this.options }> 
                               <TableHeaderColumn width='80' dataField='statusBox' dataFormat={ this.setStatusStyle} border='0'></TableHeaderColumn>
                                <TableHeaderColumn width='90' headerAlign='left' dataAlign='center' isKey  dataField='materialName' dataFormat={ this.alertDetails}>Asset</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataAlign='center'dataSort >Asset location</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='status' >Status</TableHeaderColumn>    
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='visitTimein' >Zone IN time</TableHeaderColumn>    
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='visitTimeout' >Zone OUT time</TableHeaderColumn>    
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='description' >Description</TableHeaderColumn>    
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='superviserName' >Supervisor</TableHeaderColumn>                         
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='activeTime'>Standard Time</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='description'>Actual Time</TableHeaderColumn>

                              
                               
                            </BootstrapTable>
                </div>
          </div>
    );
  }
 
}

export default ZoneDatatable;

