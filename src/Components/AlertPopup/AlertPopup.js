import React from 'react';
import './AlertPopup.css';

class AlertPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            alertList: [
                [
                {
                    key: 'ASSET',
                    value: 2753
                }, {
                     key: 'ZONE',
                    value: 'Zone 1-XX-XX'
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
var input;
    closeWindow = () => {
        // var close = document.getElementById("alertDetail");
        // close.style.display = "none";
    }
    // openWindow() {
    //     var open = document.getElementById("alertDetail");
    //     close.style.display = "block";
    // }
    
    render() {
        const  alertList  = this.state.alertList;

        return (
            <div id="alertDetail" >
                <h1>ALERT DETAILS</h1>
                <div className="sections">                      
                    <div className="leftSection">
                                    <ul>
                                        <li><p className="title">{alertList[0].key}:</p><p className="content">{alertList[0].value}</p></li>
                                        <li><p className="title">{alertList[1].key}:</p><p className="content">{alertList[1].value}</p></li>
                                        <li><p className="title">{alertList[2].key}:</p><p className="content">{alertList[2].value}</p></li>

                                    </ul>
                    </div>
                    <div className="rightSection">
                        <ul>
                            <li><p className="title">{alertList[3].key}:</p><p className="content">{alertList[3].value}</p></li>
                            <li><p className="title">{alertList[4].key}:</p><p className="content">{alertList[4].value}</p></li>
                        </ul>
                    </div>
                    <div className="lower-section">
                        <p>{alertList[5].key} : {alertList[5].value}</p>
                        <p>{alertList[6].key} : {alertList[6].value}</p>
                        <p>{alertList[7].key} : {alertList[7].value}</p>
                    </div>
                </div>
                <div className="wrap">
                    <div className="links">
                        <div className="zone-box">
                            <div className="dot"></div>
                            <div className="name">Zone 1</div>
                        </div>
                        <div className="zone-box">
                            <div className="dot"></div>
                            <div className="name">Zone 2</div>
                        </div>
                        <div className="zone-box">
                            <div className="dot"></div>
                            <div className="name">Zone 3</div>
                        </div>
                        <div className="zone-box">
                            <div className="dot"></div>
                            <div className="name">Zone 4</div>
                        </div>
                        <div className="zone-box">
                            <div className="dot"></div>
                            <div className="name">Zone 5</div>
                        </div>
                    </div>
                </div>
                <div className="button" >
                    <input type="button" className="bttn" value="Acknowledge" onClick={this.closeWindow} ></input>
                    <input type="button" className="bttn bttn-yes" value="Cancel" onClick={this.closeWindow}></input>
                </div>
            </div>
        );
    }
}
export default AlertPopup;