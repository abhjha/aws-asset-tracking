import React from 'react';
import { ZoneDatatable } from '../ZoneDatatable/ZoneDatatable';
import  ZoneDetailPopup  from '../ZoneDetailPopup/ZoneDetailPopup';


class zoneView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zoneList: {},
            zoneId: props.location.state.zoneId,
            zoneViewthing: null,
            zoneLength: 0,
            zoneName : props.location.state.zoneViewName,
            isModalOpen: false,
            popUpName : ""
     
        }
      }

        openModal = () => {
            // eslint-disable-next-line no-restricted-globals
            const popUpName = event.path[1].cells[1].innerText;
            this.setState({
                 isModalOpen: !this.state.isModalOpen,
                 popUpName : popUpName
            })
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

    setMenuActiveState =() => {
        var pageId = document.getElementsByClassName("dashboard");
        if(pageId.length > 0){
          document.getElementsByClassName('menu-heading-container')[0].classList.add('active');
          document.getElementsByClassName('menu-heading-container')[1].classList.remove('active');
        }else{
          document.getElementsByClassName('menu-heading-container')[0].classList.remove('active');
          document.getElementsByClassName('menu-heading-container')[1].classList.add('active');
        }
      }

    triggerTabSelection = (e) => {
        const zoneId = e.currentTarget.getAttribute('data-id');
        // const zoneName=e.currentTarget.getAttribute('zoneName');
        const zoneName = e.currentTarget.childNodes[0].innerText;
        this.setState({
            zoneId : zoneId,
            zoneName : zoneName
        });
    }

    componentDidMount() {
        this.triggerZoneViewCardData();
        this.setMenuActiveState();
        // clearInterval(this.triggerZoneViewCardData);
        // setInterval(this.triggerZoneViewCardData, 30000);
    }

    render() {
        const { zoneList, zoneId, zoneName } = this.state;
        return (
            <div className="zone-container">
                <div className="zone-view">
                    {zoneList.length > 0 && zoneList.map((item) => {
                        return (<div className={"zone-detail-checkbox " + (item.zoneId === zoneId  ?  "active" : "")} data-id={item.zoneId} onClick={this.triggerTabSelection}>
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
                        zoneId={zoneId} zoneName ={zoneName} triggerPopupOpen={this.openModal}
                    />
                </div>
                {this.state.isModalOpen ?  <ZoneDetailPopup popUpName={this.state.popUpName}
           closeWindow={this.openModal.bind(this)} /> : null}
            </div>
        );
    }
}

export default zoneView;

