
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './AssetMetrics.css';
class AlertMetrics extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.data
    }
    
  }

  render() {
   
    return (
        <div className="asset-tracked-graph">
            <div className="asset-metrics-heading">
                <span className="checkmark">
                    <div className="checkmark_stem"></div>
                    <div className="checkmark_kick"></div>
                </span>
            <div className="heading">ASSETS METRICS</div>
            </div>
            <div className="db-data-metrics-contents">
                <div className="total-count-and-graph">
                    <div className="total-count-and-work-in-progress">
                        <div className="total-count">3248</div>
                        <div className="work-in-progress">WORK IN PROGRESS ASSETS</div>
                    </div>
                    <div className="graph-view">
                        <Bar
          
                        data={this.state.chartData}
                       
                        options= {{
                            scaleFontColor: 'red',
                            legend: {
                                display:true,
                            
                            position:'top',
                            
                            marginRight:19,
                            labels :{
                            fontColor: 'black',
                            fontSize: 10,
                            usePointStyle: true,
                            boxWidth:5,
                            }
                            },
                            
                            scales: {
                            yAxes: [{
                            color:'black',
                            borderColor: 'red',
                                scaleLabel: {
                                display:true,
                                fontSize:10,
                                fontColor: 'black',
                                },
                                stacked: true,
                                
                                ticks: {
                                    beginAtZero:true,
                                    min:0,
                                    max:3000,
                                    stepSize:1000,
                                    lineWidth: 1,
                                    fontColor: 'black',
                                    fontSize: 12,
                                    padding:3
                                
                                
                                    
                                },
                                gridLines: {
                                    offsetGridLines: true,
                                    display:false,
                                    drawTicks: false
                                
                                }
                                }],
                                xAxes: [{
                                    
                                    barPercentage:0.6,
                                    gridLines: {
                                        offsetGridLines: true,
                                        display:false,
                                        drawTicks: false,
                                       
                                    },
                                ticks: {
                                    fontColor: 'black',
                                    fontSize: 12,
                                    padding: 10.5
                                },
                                stacked: true
                                }
                
                                ]
                                
                            }
                
                        }} />
          
                    </div>
                </div>
          
                    <div className="dormant-and-completed-assets">
                        <div className="dormant-assets">
                            <div className="dormant-assets-count">3245</div>
                            <div className="dormant-assets-label">DORMANT ASSETS</div>
                        </div>
                        <div className="completed-assets">
                        <div className="completed-assets-count">3245</div>
                        <div className="completed-assets-label">COMPLETED ASSETS</div>
                        </div>
                    </div>
            </div>
        </div>
          
        

          
    )
  }
}



export default AlertMetrics;