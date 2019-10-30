import React from 'react';
import {ZoneDatatable} from '../ZoneDatatable/ZoneDatatable';


class zoneView extends React.Component {

   
        constructor(props){
            super(props)
            this.state = {
                zoneList: {},   
                
            }
        }
    
        triggerZoneViewCardData=()=> {
           fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialCountPerZone')
            .then(resp => resp.json())
            .then(response => {
                console.log(response);
                this.setState({
                zoneList: response
                })
            });
        }
       
        componentDidMount() {
            this.triggerZoneViewCardData();
            setInterval(this.triggerZoneViewCardData,5000)
           
        }

    render() {
        const filteredZoneData={}
        const {zoneList} = this.state;
        return(
            <div className="zone-container">
                <div className = "zone-view">
                    {this.state.zoneList.length > 0 && zoneList.map(item => {
                        return (<div className="checkbox">
                        <div className="upper">
                        {item.zoneName}
                        </div>
                        <div className="lower">
                            {item.count} Assets
                        </div>
                    </div>)
                    })}
                </div>
                    
                <div className="db-alerts">
                        <ZoneDatatable
                        filteredZoneData={filteredZoneData}
                        />
                </div>
            </div>        
        );
    }
  }

export default zoneView;

