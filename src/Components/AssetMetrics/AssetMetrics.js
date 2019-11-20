import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class AssetMetrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metricsAndStatus: {},
            sumCompleted: 0,
            sumInProgress: 0,
            sumWaiting: 0,
            status: "",
            completedData: [],
            inProgressData: [],
            waitingData: [],
            dataElements: {
                labels: [],
                datasets: [
                    {

                        label: "",
                        data: [],
                        backgroundColor: ''
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: '',

                    },
                    {
                        data: [],
                        label: '',
                        backgroundColor: ''
                    }
                ]
            }
        }
    }
    triggerAssetMetricsData = () => {
        let array1 = [];
        let array2 = [];
        let array3 = [];
        let sumInProgress = 0;
        let sumWaiting = 0;
        let labelArray = [];

        fetch('https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialMetrics ')
            .then(resp => resp.json())
            .then(response => {
               
                Object.keys(response).map((item) => {
                    labelArray.push(item);

                    array1.push(response[item][0].count);

                    array2.push(response[item][1].count);
                    sumInProgress = sumInProgress + response[item][1].count;

                    array3.push(response[item][2].count);
                    sumWaiting = sumWaiting + response[item][2].count;
                    return 0;
                })

                this.setState({
                    zoneName: Object.keys(response),
                    metricsAndStatus: response,
                    dataElements: {
                        labels: labelArray,
                        datasets: [
                            {
                                label: "Waiting",
                                data: array3,
                                backgroundColor: "#ffda78"
                            },
                            {
                                label: "In Progress",
                                data: array2,
                                backgroundColor: "#8ad0f9",

                            },
                            {
                                label: "Completed",
                                data: array1,
                                backgroundColor: "#bad96b"
                            }
                           
                          
                        ]
                    },

                    sumCompleted: response["Quality Assurance"][0].count,
                    sumInProgress: sumInProgress,
                    sumWaiting: sumWaiting
                })
            });
    }
    componentDidMount = () => {
        this.triggerAssetMetricsData();
        clearInterval(this.triggerAssetMetricsData);
        setInterval(this.triggerAssetMetricsData, 30000);
    }
    render() {
        return (
            <div className="asset-metrics-wrapper">
                <div className="asset-tracked-graph">
                    <div className="card-heading">
                        <div className="heading"><h1>Material Live Metrics</h1></div>
                    </div>
                    <div className="db-data-metrics-contents">
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
                                        position: 'bottom',
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

                                                stepSize: 10,
                                               
                                                fontColor: 'black',
                                                fontSize: 12,
                                                padding: 3
                                            },
                                            gridLines: {
                                                offsetGridLines: true,
                                                display: true,
                                                drawTicks: false
                                            }
                                        }],
                                        xAxes: [{
                                            barPercentage: 0.6,
                                            gridLines: {
                                                offsetGridLines: true,
                                                display: true,
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
                </div>
                <div className="asset-status-count ">
                    <div className="dormant-assets">
                        <div className="dormant-assets-count">{this.state.sumWaiting}</div>
                        <div className="dormant-assets-label">Waiting Materials</div>
                    </div>
                    <div className="total-count-and-work-in-progress">
                        <div className="total-count">{this.state.sumInProgress}</div>
                        <div className="work-in-progress">In Progress Materials</div>
                    </div>
                    <div className="completed-assets">
                        <div className="completed-assets-count">{this.state.sumCompleted}</div>
                        <div className="completed-assets-label">Completed Materials</div>
                    </div>                  
                </div>
            </div>
        )
    }
}

export default AssetMetrics;