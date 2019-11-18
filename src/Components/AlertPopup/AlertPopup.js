import React from 'react';


class AlertPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           
            alertPopupData: [],
            alertList: [
                {
                    key: 'ASSET',
                    
                }, {
                     key: 'ZONE',
                    
                 }, {
                    key: 'STATUS',
                     
                 }, {
                     key: 'TIME IN',
                    
                 }, {
                     key: 'DESCRIPTION',
                     
                 }, {
                     key: 'Shift',
                     
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
   
    render() {
        const  alertList  = this.state.alertList;
       
        return (
            <div id="alertDetail" >
                <h1>ALERT DETAILS</h1>
                <div className="sections">                      
                    <div className="leftSection">
                       
                        
                                <ul>
                                <li><p className="title">{alertList[0].key}:</p><p className="content">{this.props.alertPopUpName}</p></li>
                                <li><p className="title">{alertList[1].key}:</p><p className="content">{this.props.zoneName}</p></li>
                                <li><p className="title">{alertList[2].key}:</p><p className="content">{this.props.status}</p></li>

                            </ul>

                          
                    </div>
                    <div className="rightSection">
                        <ul>
                            <li><p className="title">{alertList[3].key}:</p><p className="content">{this.props.timeStamp}</p></li>
                            <li><p className="title">{alertList[4].key}:</p><p className="content">{this.props.description}</p></li>
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
                    <input type="button" className="bttn" value="Acknowledge" onClick={this.props.closeWindow} ></input>
                    <input type="button" className="bttn bttn-yes" value="Cancel" onClick={this.props.closeWindow}></input>
                </div>
            </div>
        );
    }
}
export default AlertPopup;