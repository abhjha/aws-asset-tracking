import React from 'react';
import {ZoneDatatable} from '../ZoneDatatable/ZoneDatatable';
import './zoneView.scss';

class zoneView extends React.Component {

    constructor(props){
        super(props)
        this.state = {

            
            zoneList:[
                {
                zoneId: 'ZONE 1',
                assetCount: 123
            }, {
                zoneId: 'ZONE 2',
                assetCount: 143
            }, {
                zoneId: 'ZONE 3',
                assetCount: 64
            }, {
                zoneId: 'ZONE 4',
                assetCount: 88
            }, {
                zoneId: 'ZONE 5',
                assetCount: 198
            }]
        }
    }

    render() {
        const filteredZoneData= {
            SelectedZone: [
                {
                    materialName: "Copper",
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
                        {item.zoneId}
                        </div>
                        <div className="lower">
                            {item.assetCount} Assets
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

