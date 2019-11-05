import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FadeLoader from 'react-spinners/FadeLoader';

export class ZoneDatatable extends React.Component {

  constructor(props) {
    super(props);
    this.options = {
      responsive: true
    };
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
      styleClassName = 'text-danger';
    } else if (row.status.toLowerCase() === 'in progress') {
      styleClassName = 'text-primary';
    } else if (row.status.toLowerCase() === 'waiting') {
      styleClassName = 'text-warning';
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
        console.log(err);
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
  }

  render() {
    const { isSearchEnabled, loading } = this.state;

    return (
      <div id="tableGridPanel">
        <div className="alert-zone">
          <div className="alerts-zone-heading">{this.state.zoneName}</div>
        </div>

        <div className="tableAndFilterContainer withoutTabs">
          { loading && <div className='loader-icon'>
            <FadeLoader
              sizeUnit={"px"}
              size={150}
              color={'#e4e4e4'}
              loading={this.state.loading}
            />
          </div>
          }
          { !loading && <div>

          <div className="filterIcons">
            <i className="fas fa-calendar pull-right tableTools" onClick={this.showHideCalendarTool}></i>
            <i className="fas fa-filter pull-right tableTools" onClick={this.showHideFilterTool}></i>
            <i className="fab fa-sistrix pull-right tableTools"
              onClick={(e) => this.options.showSearchTool(e)}></i>
          </div>

          <input type="hidden" value={this.state.activeTabKey} />

          <BootstrapTable
            ref='alertsTable' containerClass="alertsTable" data={this.state.filteredZoneData.SelectedZone} striped hover bordered={false} search={isSearchEnabled} multiColumnSearch options={this.options}>
            <TableHeaderColumn width='80' dataField='statusBox' dataFormat={this.setStatusStyle} border='0'></TableHeaderColumn>
            <TableHeaderColumn width='90' headerAlign='left' dataAlign='center' isKey dataField='materialName' dataFormat={this.alertDetails}>Asset</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataSort >Asset location</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='status' >Status</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='visitTimein' >Zone IN time</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='visitTimeout' >Zone OUT time</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='description' >Description</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='superviserName' >Supervisor</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='activeTime'>Standard Time</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' dataField='description'>Actual Time</TableHeaderColumn>
          </BootstrapTable>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default ZoneDatatable;

