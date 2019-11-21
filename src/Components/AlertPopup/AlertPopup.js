import React from 'react';


class AlertPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen:false,
            guId:props.guId,
            nameArray:[],
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
                
            ],
            
           
            positionArray:['5px', '152px', '298px', '445px', '592px'],
            dotColor:'red', 
            zoneIndex:0,           
        }
    }

    componentDidMount(){
       
        const zoneArray = ['Metal Shop', 'Vaccum Forming Shop', 'Piping And Cooling Shop', 'Paint Shop', 'Quality Assurance'];
        const zoneIndex = zoneArray.indexOf(this.props.zoneName);
        this.setState({zoneIndex});
        this.highlightRing(zoneIndex);
    }
    highlightRing=(zoneIndex)=> {
        var ringObject=document.getElementsByClassName("dot");
        ringObject[zoneIndex].classList.add('active-state');

    }
   
   
    render() {
        const  {alertList, positionArray, zoneIndex}  = this.state;
       
        return (
            <div className="alert-popup-wrapper">
                <div id="alertDetail" >
                    <h1>ALERT DETAILS</h1>
                    <div className="sections">
                        <div className="leftSection">
                            <ul>
                                <li><p className="title">{alertList[0].key}:</p><p className="content">{this.props.alertPopUpName}</p></li>
                                <li><p className="title">{alertList[1].key}:</p><p className="content">{this.props.zoneName}</p></li>
                            </ul>
                        </div>
                        <div className="rightSection">
                            <ul>
                                <li><p className="title">{alertList[3].key}:</p><p className="content">{this.props.timeStamp}</p></li>
                                <li><p className="title">{alertList[4].key}:</p><p className="content">{this.props.description}</p></li>
                            </ul>
                        </div>
                        <div className="lower-section" style={{'marginLeft': positionArray[zoneIndex]}}>
                            <p>{alertList[6].key} : {alertList[6].value}</p>
                            <p>{alertList[7].key} : {alertList[7].value}</p>
                        </div>
                    </div>
                   <div className="zones">
                       <div className="alert-popup-zone">
                       
                            <div className="dot" >
                                <div className="alert-links"></div>
                            </div>
                            <div className="alert-popup-zone-heading">Metal Shop</div>
                        </div>
                          
                        <div className="alert-popup-zone">
                       
                            <div className="dot">
                                <div className="alert-links"></div>
                            </div>
                            <div className="alert-popup-zone-heading">Vaccum Forming Shop</div>
                           
                        </div>
                        
                        <div className="alert-popup-zone">
                       
                            <div className="dot" >
                                <div className="alert-links"></div>
                            </div>
                            <div className="alert-popup-zone-heading">Piping and Cooling Shop</div>
                         
                        </div>
                           
                        <div className="alert-popup-zone">
                      
                            <div className="dot" >
                                <div className="alert-links"></div>
                            </div>
                            <div className="alert-popup-zone-heading">Paint Shop</div>
                           
                        </div>
                          
                        <div className="alert-popup-zone">
                       
                            <div className="dot" >
                                <div className="alert-links"></div>
                           </div>
                           <div className="alert-popup-zone-heading">Quality Assurance</div>
                          
                        </div>
                    </div>
                    <div className="button" >
                        <input type="button" className="acknowledge-button" value="Acknowledge" onClick={this.props.closeWindowRemoveRow} ></input>
                        <input type="button" className="bttn bttn-yes" value="Cancel" onClick={this.props.closeWindow}></input>
                    </div>
                </div>
            </div>
        );
    }
}
export default AlertPopup;