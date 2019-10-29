import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './dataTableComponent.css';
import './dataTableComponent-dep.css';
import alert from './alert.svg'
export class DataTableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.options = {
        responsive: true
    };
    this.state = {
        isSearchEnabled: true,
        isFilterEnabled: true,
        filterItem : [],
        filteredData: [
            {"id":"1","status":"warning","statusBox":"" ,"dateTime":"123","activeTime":"431","description":"987","parameter":"987","location":"qwer"},
            {"id":"2","status":"critical","statusBox":"" ,"dateTime":"126","activeTime":"432","description":"987","parameter":"987","location":"qwer"},
            {"id":"3","status":"warning","statusBox":"" ,"dateTime":"125","activeTime":"434","description":"987","parameter":"987","location":"qwer"},
            {"id":"4","status":"non-critical","statusBox":"" ,"dateTime":"124","activeTime":"435","description":"987","parameter":"987","location":"qwer"}
        ],
    };
  }
  
  setStatusStyle(cell, row){
     let styleClassName = '';
      if(row.status.toLowerCase() === 'critical'){
        styleClassName = 'text-danger';
      } else if(row.status.toLowerCase() === 'non-critical'){
        styleClassName = 'text-primary';
      } else if(row.status.toLowerCase() ==='warning'){
        styleClassName = 'text-warning';
      }
      return `<i class='fas fa-circle statusMarker ${ styleClassName }' ></i> ${cell}`; 
  }
 

 render() {
    
  
    const { isSearchEnabled, filteredData,} = this.state; 
          return ( 
          
          <div id="tableGridPanel">
            <div className="alert-zone">
            <img className="alerts-icon" src={alert} alt="alert"></img>
            <div className="alerts-zone-heading">ALERTS</div>
            
            </div>
              
                <div className="tableAndFilterContainer withoutTabs">
                    <div className="filterIcons">
                        <i className="fas fa-calendar pull-right tableTools" onClick={this.showHideCalendarTool}></i>       
                        <i className="fas fa-filter pull-right tableTools" onClick={this.showHideFilterTool}></i> 
                        <i className="fab fa-sistrix pull-right tableTools" 
                            onClick={(e) => this.options.showSearchTool(e)}></i>
                       
                    </div>
                   
                    <input type="hidden" value={this.state.activeTabKey} />
                            <BootstrapTable ref='alertsTable' containerClass="alertsTable" data={filteredData}  striped hover bordered={ false } search={isSearchEnabled} multiColumnSearch options={ this.options }> 
                                <TableHeaderColumn width='30' dataField='statusBox' dataFormat={ this.setStatusStyle}></TableHeaderColumn>
                                <TableHeaderColumn width='90' headerAlign='center' dataAlign='center' isKey  dataField='id'dataFormat={ this.alertDetails}>Asset</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataAlign='center'dataSort  dataField='dateTime' >Zone</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='status' >Status</TableHeaderColumn>                                
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='activeTime'>Standard Time</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataAlign='center'  dataField='description'>Actual Time</TableHeaderColumn>
                            </BootstrapTable>
                </div>
          </div>
    );
  }
 
}

export default DataTableComponent;

