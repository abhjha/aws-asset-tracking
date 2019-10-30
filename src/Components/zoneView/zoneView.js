import React from 'react';
import {ZoneDatatable} from '../ZoneDatatable/ZoneDatatable';
import './zoneView.scss';

class zoneView extends React.Component {

    constructor(props){
        super(props)
        this.state = {

            
            zoneList: [
                {
                  "zoneName": "Sheet Metal Bending",
                  "zoneId": "zone001",
                  "count": 1
                },
                {
                  "zoneName": "Cabinet Assembly",
                  "zoneId": "zone002",
                  "count": 0
                },
                {
                  "zoneName": "Cooling System Installation",
                  "zoneId": "zone003",
                  "count": 1
                },
                {
                  "zoneName": "Gasket Installation",
                  "zoneId": "zone004",
                  "count": 0
                },
                {
                  "zoneName": "Testing Area",
                  "zoneId": "zone005",
                  "count": 0
                }
              ]
        }
    }

    render() {
        const filteredZoneData= {
            SelectedZone: [
                {
                    materialName: "Copper",
                    statusBox:"",
                    zoneName: "Sheet Metal Bending",
                    status: "Waiting",
                    visitDate: "Oct 24, 2019 12:00:00 AM",
                    visitTimein: "Oct 24, 2019 10:55:16 AM",
                    visitTimeout: "Oct 24, 2019 10:55:16 AM",
                    description: "---",
                    superviserName: "John"
                },
                {
                    materialName: "Copper",
                    statusBox:"",
                    zoneName: "xyz",
                    status: "Waiting",
                    visitDate: "Oct 24, 2019 12:00:00 AM",
                    visitTimein: "Oct 24, 2019 10:55:16 AM",
                    visitTimeout: "Oct 24, 2019 10:55:16 AM",
                    description: "---",
                    superviserName: "John"
                },
                {
                    materialName: "Copper",
                    statusBox:"",
                    zoneName: "Sheet Metal Bending",
                    status: "Waiting",
                    visitDate: "Oct 24, 2019 12:00:00 AM",
                    visitTimein: "Oct 24, 2019 10:55:16 AM",
                    visitTimeout: "Oct 24, 2019 10:55:16 AM",
                    description: "---",
                    superviserName: "John"
                }
            ]
        }
    
          
        const {zoneList} = this.state;
        return(
            <div className="zone-container">
                <div className = "zone-view">
                    {zoneList.length > 0 && zoneList.map(item => {
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

