import React from 'react';


class AlertPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen:false,
            guId:props.guId,
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
    closeWindow=()=> {
        this.triggerAcknowledgeClick()
         this.setState({ 
          isModalOpen: !this.state.isModalOpen,
           })
    
          }
    triggerAcknowledgeClick = () => {
        var form = new FormData()
        const data = {
          guid: this.state.guId,
          timestamp: this.props.timeStamp,
          materialId: this.props.alertPopUpName
        }
        form = form.append("myJsonKey",JSON.stringify(data))
        fetch('https://b7h0jkep5i.execute-api.us-west-2.amazonaws.com/Stage/UpdateAlert?guid=-qWF_J9d3&timestamp=1574082873536&materialId=ELS41143',{
          method:'POST',
          body:form
      })
    }
    componentDidMount=()=> {
        this.triggerAcknowledgeClick()

    }
    render() {
        const  alertList  = this.state.alertList;
       
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
                        <div className="lower-section">
                            <p>{alertList[5].key} : {alertList[5].value}</p>
                            <p>{alertList[6].key} : {alertList[6].value}</p>
                            <p>{alertList[7].key} : {alertList[7].value}</p>
                        </div>
                    </div>
                   <div className="zones">
                       <div className="alert-popup-zone">
                       
                            <div className="dot">
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
                       
                            <div className="dot">
                                <div className="alert-links"></div>
                            </div>
                            <div className="alert-popup-zone-heading">Piping and Cooling Shop</div>
                         
                        </div>
                           
                        <div className="alert-popup-zone">
                      
                            <div className="dot">
                                <div className="alert-links"></div>
                            </div>
                            <div className="alert-popup-zone-heading">Paint Shop</div>
                           
                        </div>
                          
                        <div className="alert-popup-zone">
                       
                            <div className="dot">
                                <div className="alert-links"></div>
                           </div>
                           <div className="alert-popup-zone-heading">Quality Assurance</div>
                          
                        </div>
                    </div>
                    <div className="button" >
                        <input type="button" className="acknowledge-button" value="Acknowledge" onClick={this.closeWindow} ></input>
                        <input type="button" className="bttn bttn-yes" value="Cancel" onClick={this.props.closeWindow}></input>
                    </div>
                </div>
            </div>
        );
    }
}
export default AlertPopup;