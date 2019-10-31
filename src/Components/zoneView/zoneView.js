import React from 'react';
import {ZoneDatatable} from '../ZoneDatatable/ZoneDatatable';


class zoneView extends React.Component {

   
        constructor(props){
            super(props)
            this.state = {
                colorArray:[ '#44b8e2','#db9bc8','#8ad0f9','#ffde77','#dbdde1'],
                zoneList: {},   
                
            }
        }
    
        triggerZoneViewCardData=()=> {
           fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialCountPerZone')
            .then(resp => resp.json())
            .then(response => {
                this.setState({
                zoneList: response
                })
            });
        }
       
        componentDidMount() {
            this.triggerZoneViewCardData();
            clearInterval(this.triggerZoneViewCardData);
            setInterval(this.triggerZoneViewCardData,5000)
           
        }

    render() {
       
        const {zoneList} = this.state;
        return(
            <div className="zone-container">
                <div className = "zone-view">
                    {zoneList.length > 0 && zoneList.map((item, index)=> {
                        return (<div className="zone-detail-checkbox">
                        <div className="upper">
                        {item.zoneName}
                        </div>
                        <div className="lower" style={{backgroundColor: this.state.colorArray[index]}}>
                            {item.count} Assets
                        </div>
                    </div>)
                    })}
                </div>
                    
                <div className="zone-data-wrapper">
                        <ZoneDatatable/>
                </div>
            </div>        
        );
    }
  }

export default zoneView;

