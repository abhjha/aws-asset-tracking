import React from 'react';
import { Doughnut , Chart}  from 'react-chartjs-2';
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    var chart = this.chart;
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;
    var fontSize = "25px";
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    var sum=chart.config.data.datasets[0].data[2]+chart.config.data.datasets[0].data[1]+chart.config.data.datasets[0].data[0]
    var text = ((chart.config.data.datasets[0].data[2]/sum)*100).toFixed(2) + "%" ,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});


export class ZoneDetailPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataElements: {
            materialStatusState : "gray-state",   
            datasets: [
                    {
                        data: [2,4,25],
                        backgroundColor: ['rgb(237,237,237)','rgb(237,237,237)','rgb(151, 221, 198)'],
                        borderWidth:1,
                        borderAlign:'inner'
                    }
                ],
                labels: ['In Progress',"Waiting",'Completed'],
                borderColor: [
                    '#d0b000',
                    '#bb112e'
               ],
               
            },
            count:0,
            alertData:{},
            alertList: [
                {
                    key: 'Current Zone',
                    value: 'Paint Shop'
                }, {
                     key: 'Total Alerts',
                    value: '2'
                
                }
            ],
            alertCount : 0,
            zoneDetailsObject : {},
        } 
    }
                
           
    getTime = (data , status) =>{
        var defaultTime = ""
        for(let i=0;i<data.length;i++){
            if(data[i].status === status && data[i].visitTimein!==undefined){
               return defaultTime = new Date(data[i].visitTimein).getHours() + ":" + new Date(data[i].visitTimein).getMinutes();
            }
           
        }
        return defaultTime;
    }
    triggerAlertPopup = () => {
        let completedCount=0
        this.setState({loading:true})
        fetch(`https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialInfo?materialId=${this.props.popUpName}`)
          .then(resp => resp.json())
          .then(response => {
            var responseKeys = Object.keys(response);
           for (let i = 0; i < responseKeys.length; i++) {
            for (let j = 0; j < response[responseKeys[i]].length; j++) {
               if ( response[responseKeys[i]][j].status === "Completed") {
                 completedCount++;
              }
             }
           }
            this.setState({
             zoneDetailsObject:response,
            count:completedCount
             
             
            })
          })
        }
        getAlertCount = () =>{
            fetch(`https://b7h0jkep5i.execute-api.us-west-2.amazonaws.com/Stage/GetAlertCount?materialId=${this.props.popUpName}`)
          .then(resp => resp.json())
          .then(response => {
             
              
            this.setState({
             alertCount:response
            })
          })
        }
        updateGraph = (graphValue) => {
            document.getElementById("graph-skills").innerHTML = `<canvas id="graph-matrix"></canvas>`;
            
            var c1 = document.getElementById("graph-matrix");
            var context1 =c1.getContext("2d");
            var text = (graphValue / 2).toFixed(2) * 100 + "%";
            context1.font = "bold 24px Roboto, sans-serif ";
            context1.beginPath();
            context1.arc(150, 75, 62, 0, graphValue * Math.PI);
            context1.lineWidth = 17;
            context1.strokeStyle = "rgb(151,221,198)";
            context1.fillStyle = "#000";
            context1.stroke();
            context1.fillText(text, 123, 83);
            context1.width = context1.clientWidth;
            context1.height = context1.clientHeight;
        }
      
  componentDidMount = () => {
    this.triggerAlertPopup();
    this.getAlertCount();
    this.updateGraph(this.state.completedCount); 
    clearInterval(this.triggerZoneViewTable);
    setInterval(this.triggerZoneViewTable, 30000);
  }
    render() {
        const  alertList  = this.state.alertList;

        return (
            <div id="alertDetail" >
                <div className="sections-donut-chart">
                    <div className="heading-and-sections">
                        <h1>{this.props.popUpName}</h1>
                        <div className="sections">                      
                            <div className="leftSection">
                                <ul>
                                    <li><p className="title">{alertList[0].key}:</p><p className="content">{alertList[0].value}</p></li>
                                    <li><p className="title">{alertList[1].key}:</p><p className="content">{this.state.alertCount}</p></li>
                                </ul>
                            </div>
                        </div>
                   </div>

                    <div className="donut-chart" id="graph-skills">
                    <canvas id="graph-matrix"></canvas>
                    
                    </div>
                    </div>
                    <div className="zone">
                        {Object.keys(this.state.zoneDetailsObject).length>0 && Object.keys(this.state.zoneDetailsObject).map((item,index)=> {
                                return(
                                    <div className="zone-popup-container">
                                        <div className="zone-heading">{item}</div>
                                        <ul className='zone-main-list'>
                                            <div className="alert-links">
                                                <li className={"alert-zone-waiting " + ("" === this.getTime(this.state.zoneDetailsObject[item]  , "Waiting") ? "gray-state" : "")}></li>
                                                <li className={"alert-zone-in-progress " +( "" === this.getTime(this.state.zoneDetailsObject[item]  , "In Progress") ? "gray-state" : "")}></li>
                                                <li className={"alert-zone-completed " + ("" === this.getTime(this.state.zoneDetailsObject[item]  , "Completed") ? "gray-state" : "")}></li>
                                            </div> 
                                        </ul> 
                                            <div className="time-stamps">
                                                <div className="waiting-time">{this.getTime(this.state.zoneDetailsObject[item] , "Waiting")}</div>
                                                <div className="in-progress-time">{this.getTime(this.state.zoneDetailsObject[item],"In Progress")}</div>
                                                <div className="completed-time">{this.getTime(this.state.zoneDetailsObject[item],"Completed")}</div>
                                            </div> 
                                        </div>
                                
                                 )})} 
                                 </div>
                     <div className="legends-wrapper">
                     <div className="alert-legends">
                         <ul className="zone-alert-legends">
                           <li className="zone-alert-bullet-and-count-legends">
                             <div className="zone-waiting"></div>
                             <div className="zone-alert-legends-labels">Waiting</div></li>
                           <li className="zone-alert-bullet-and-count-legends">
                             <div className="zone-in-progress"></div>
                             <div className="zone-alert-legends-labels">In Progress</div></li>
                           <li className="zone-alert-bullet-and-count-legends">
                             <div className="zone-completed"></div>
                             <div className="zone-alert-legends-labels">Completed</div></li>
                         </ul>
                          </div>
                     </div>
                     </div>
                    );}}
    
export default ZoneDetailPopup;