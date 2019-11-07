import React from 'react';
import { ZoneDatatable } from '../ZoneDatatable/ZoneDatatable';

class zoneView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zoneList: {},
            zoneId: props.location.state.zoneId,
            zoneViewthing: null,
            zoneLength: 0

        }
    }

    triggerZoneViewCardData = () => {
        fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialCountPerZone')
            .then(resp => resp.json())
            .then(response => {
                this.setState({
                    zoneList: response,
                })
            });
    }

    triggerTabSelection = (e) => {
        const zoneId = e.currentTarget.getAttribute('data-id');
        this.setState({zoneId});
    }

    componentDidMount() {
        this.triggerZoneViewCardData();
        clearInterval(this.triggerZoneViewCardData);
        setInterval(this.triggerZoneViewCardData, 30000);
    }

    render() {
        const { zoneList, zoneId } = this.state;
        return (
            <div className="zone-container">
                <div className="zone-view">
                    {zoneList.length > 0 && zoneList.map((item) => {
                        return (<div className={"zone-detail-checkbox " + (item.zoneId === zoneId ? "active" : "")} data-id={item.zoneId} onClick={this.triggerTabSelection}>
                            <div className="upper">
                                {item.zoneName}
                            </div>
                            <div className="lower">
                                {item.count} Materials
                        </div>
                        </div>)
                    })}
                </div>

                <div className="db-alerts card-tile">
                    <ZoneDatatable
                        zoneId={zoneId}
                    />
                </div>
            </div>
        );
    }
}

export default zoneView;

