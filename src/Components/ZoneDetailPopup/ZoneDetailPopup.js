import React from 'react';
import DonutChart from 'react-donut-chart';


export class ZoneDetailPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            alertData:{},
            alertList: [
                {
                    key: 'Current Zone',
                    value: 'Paint Shop'
                }, {
                     key: 'Total Alerts',
                    value: '2'
                 }, {
                    key: 'STATUS',
                     value: 'WAITING'
                 }, {
                     key: 'TIME IN',
                     value: '12:00:00'
                 }, {
                     key: 'TIME OUT',
                     value: '12:45:00'
                 }, {
                     key: 'Shift',
                     value: 2
                 }, {
                    key: 'Supervisor',
                     value: 'John Doe'
                }, {
                    key: 'Resolution',
                    value: 'Pending'
                }
            ]            
        }
    }
    triggerAlertPopup = () => {
        this.setState({loading:true})
        fetch(`https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialHistory?zoneId=${this.props.zoneId}`)
          .then(resp => resp.json())
          .then(response => {
            this.setState({
             
              alertData: response,
              zoneName: response.SelectedZone[0].zoneName
            })
          })
        }
        
  componentDidMount = () => {
    this.triggerAlertPopup();
    clearInterval(this.triggerZoneViewTable);
    setInterval(this.triggerZoneViewTable, 30000);
  }
    render() {
        const  alertList  = this.state.alertList;

        return (
            <div id="alertDetail" >
                <div className="sections-donut-chart">
                    <div className="heading-and-sections">
                <h1>ELS47800</h1>
                <div className="sections">                      
                    <div className="leftSection">
                                    <ul>
                                        <li><p className="title">{alertList[0].key}:</p><p className="content">{alertList[0].value}</p></li>
                                        <li><p className="title">{alertList[1].key}:</p><p className="content">{alertList[1].value}</p></li>
                                       

                                    </ul>
                    </div>
                   </div>
                   </div>
                    <div className="donut-chart">

                    <DonutChart
                     height= {150}
                     width={150}
                     outerRadius= {0.8}
                     innerRadius={0.6}
                     legend={false}
                     colors={['#97DD6', '#e91e63']}
                    data={[
                        {
                            label: 'Completed',
                            value: 10,
                            isEmpty:true,
                            
                        },
                        {
                            label: 'In Progress',
                            value: 30,
                        }
                        ]} />
                    </div>
                    </div>
                    <div className="all-zones">
                        <div className="zone">
                        <div className="zone-heading">Metal Shop</div>
                        <ul className='zone-main-list'>
                        <li className="alert-zone-waiting"></li>
                        <li className="alert-zone-in-progress"></li>
                          <li className="alert-zone-completed"></li>
                   
                    </ul>
                        </div>
                        <div className="zone">
                        <div className="zone-heading">Vacuum Forming Shop</div>
                        <ul className='zone-main-list'>
                        <li className="alert-zone-waiting"></li>
                        <li className="alert-zone-in-progress"></li>
                        <li className="alert-zone-completed"></li>
                   
                    </ul>
                        </div>
                        <div className="zone">
                        <div className="zone-heading">Piping and Cooling shop</div>
                        <ul className='zone-main-list'>
                        <li className="alert-zone-waiting"></li>
                        <li className="alert-zone-in-progress"></li>
                          <li className="alert-zone-completed"></li>
                   
                    </ul>
                        </div>
                        <div className="zone">
                        <div className="zone-heading">Paint Shop</div>
                        <ul className='zone-main-list'>
                        <li className="alert-zone-waiting"></li>
                        <li className="alert-zone-in-progress"></li>
                          <li className="alert-zone-completed"></li>
                   
                    </ul>
                        </div>
                        <div className="zone">
                        <div className="zone-heading">Quality Assurance</div>
                        <ul className='zone-main-list'>
                        <li className="alert-zone-waiting"></li>
                        <li className="alert-zone-in-progress"></li>
                          <li className="alert-zone-completed"></li>
                   
                    </ul>
                        </div>
                    </div>
                   
                   
                
               
                <div className="legends-wrapper">
      <div className="alert-legends">
          <ul className="zone-alert-legends">
            <li className="zone-alert-bullet-and-count-legends">
              <div className="zone-waiting"></div>
              <div className="zone-alert-legends-labels">Waiting</div></li>
            <li className="zone-alert-bullet-and-count-legends">
              <div className="zone-in-progress"></div>
              <div className="zone-alert-legends-labels">In Progress</div></li>
            <li className="zone-alert-bullet-and-count-legends">
              <div className="zone-completed"></div>
              <div className="zone-alert-legends-labels">Completed</div></li>
          </ul>
           </div>
      </div>
            </div>
        );
    }
}
export default ZoneDetailPopup;