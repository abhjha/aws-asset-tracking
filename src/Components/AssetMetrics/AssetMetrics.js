
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class AlertMetrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metricsAndStatus: {},
            sumCompleted:0,
            sumInProgress:0,
            sumWaiting:0,
          
            status: "",
            completedData:[],
            inProgressData:[],
            waitingData:[],
            dataElements:   {
                labels: [],
                datasets: [
                    {
                        
                         label: "",
                         data:  [],
                         backgroundColor: ''
                    },
                   {
                     label: '',
                     data:  [],
                     backgroundColor: '',
                     
                   },
                   {
                     data:  [],
                     label: '',
                     backgroundColor: ''
                   }
                ]
                }
            }
        }
    triggerAssetMetricsData = () => {
       
      

        fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialMetrics ')
        .then(resp => resp.json())
        .then(response => {
            console.log( response)
            this.setState({
            zoneName: Object.keys(response),
            metricsAndStatus:response,
            
           
            dataElements: {
                labels: [Object.keys(response)[0], Object.keys(response)[1],Object.keys(response)[2], Object.keys(response)[3], Object.keys(response)[4]],
                datasets: [
                {
                        
                        label: response[Object.keys(response)[1]][0].mtstatusName,
                        data:  [response[Object.keys(response)[0]][0].count,
                        response[Object.keys(response)[1]][0].count,
                        response[Object.keys(response)[2]][0].count,
                        response[Object.keys(response)[3]][0].count,
                        response[Object.keys(response)[4]][0].count
                    ],
                        backgroundColor: '#bad96b'
                },
                
                  {
                    label: response[Object.keys(response)[1]][1].mtstatusName,
                    data:  [response[Object.keys(response)[0]][1].count,
                    response[Object.keys(response)[1]][1].count,
                    response[Object.keys(response)[2]][1].count,
                    response[Object.keys(response)[3]][1].count,
                    response[Object.keys(response)[4]][1].count
                ],
                    backgroundColor: '#8ad0f9',
                    borderWidth: 1
                  },
                  {
                    data:  [response[Object.keys(response)[0]][2].count,
                    response[Object.keys(response)[1]][2].count,
                    response[Object.keys(response)[2]][2].count,
                    response[Object.keys(response)[3]][2].count,
                    response[Object.keys(response)[4]][2].count
                ],
                    label: response[Object.keys(response)[1]][2].mtstatusName,
                    backgroundColor: '#ffda78'
                  },
                 
                ]
                
              },
              sumCompleted :response[Object.keys(response)[0]][0].count+
              response[Object.keys(response)[1]][0].count+
              response[Object.keys(response)[2]][0].count+
              response[Object.keys(response)[3]][0].count+
              response[Object.keys(response)[4]][0].count,


              sumInProgress :
              response[Object.keys(response)[0]][1].count+
              response[Object.keys(response)[1]][1].count+
              response[Object.keys(response)[2]][1].count+
              response[Object.keys(response)[3]][1].count+
              response[Object.keys(response)[4]][1].count,
            
              sumWaiting :response[Object.keys(response)[0]][0].count+
              response[Object.keys(response)[1]][2].count+
              response[Object.keys(response)[2]][2].count+
              response[Object.keys(response)[3]][2].count+
              response[Object.keys(response)[4]][2].count
             

            
           
          })
          
        });
        
      }
      
    
      componentDidMount = () => {
        this.triggerAssetMetricsData();
     
      }
    
   
    render() {
        
        return (
            <div className="asset-tracked-graph">
                <div className="card-heading">
                    <div className="heading"><h1>Asset Metrics</h1></div>
                </div>
                <div className="db-data-metrics-contents">
                    <div className="total-count-and-graph">
                        <div className="total-count-and-work-in-progress">
                            <div className="total-count">{this.state.sumInProgress}</div>
                            <div className="work-in-progress">WORK IN PROGRESS ASSETS</div>
                        </div>
                        <div className="graph-view">
                            <Bar
                                data={this.state.dataElements}
                                height={null}
                                width={null}
                                options={{
                                    scaleFontColor: '',
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: true,
                                        position: 'top',
                                        marginRight: 19,
                                        labels: {
                                            fontColor: 'black',
                                            fontSize: 10,
                                            usePointStyle: true,
                                            boxWidth: 5,
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            color: 'black',
                                            borderColor: 'red',
                                            scaleLabel: {
                                                display: true,
                                                fontSize: 10,
                                                fontColor: 'black',
                                            },
                                            stacked: true,
                                            ticks: {
                                                beginAtZero: true,
                                                min: 0,
                                                max: 3,
                                                stepSize: 1,
                                                lineWidth: 1,
                                                fontColor: 'black',
                                                fontSize: 12,
                                                padding: 3
                                            },
                                            gridLines: {
                                                offsetGridLines: true,
                                                display: false,
                                                drawTicks: false
                                            }
                                        }],
                                        xAxes: [{
                                            barPercentage: 0.6,
                                            gridLines: {
                                                offsetGridLines: true,
                                                display: false,
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
                            <div className="dormant-assets-count">{this.state.sumWaiting}</div>
                            <div className="dormant-assets-label">DORMANT ASSETS</div>
                        </div>
                        <div className="completed-assets">
                            <div className="completed-assets-count">{this.state.sumCompleted}</div>
                            <div className="completed-assets-label">COMPLETED ASSETS</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlertMetrics;