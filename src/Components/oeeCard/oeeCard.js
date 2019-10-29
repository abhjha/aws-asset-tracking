import React from 'react';
import './css.css';

export class OeeCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            oeeCardData:{
                "oee":[0, "normal", 0], 
                "availability_data":[0, "normal", 0],
                "performance_data":[0, "normal", 0],
                "quality_data":[0, "normal", 0]
            }
        }
    }

    // static getDerivedStateFromProps(props){
    //     return {
    //         oeeCardData:props.oeeCardData
    //     }
    // }
 
    getPosNeg(val){
        let _data = [];
        if(val < 0){
            _data[0] = -1 * val;
            _data[1] = "bottom";
        }else{
            _data[0] = val;
            _data[1] = "top";
        }
        return _data;
    }

    getRemainder(val){
        return (val + "").split(".");
    }

    styleOptions(style){
        return { width: style+"%"};
    }

    componentDidMount(){
        // var c = document.getElementById("myChart1");
        // var ctx = c.getContext("2d");
        // ctx.beginPath();
        // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        // ctx.stroke();
    }

    render() {
        var tmp = this.state.oeeCardData;
        return (
            <div id="oeeCard" ref="oeeCard">
            <div className="panelCard oeeVals">
                <div className="doughnutGraph">
                    <div className="oeeMainVal">
                        <h2>OEE</h2>
                        <h3><span className="percValue">{this.getRemainder(tmp.oee[0])[0]}</span><span className="remValue">.{this.getRemainder(tmp.oee[0])[1]}%</span></h3>
                    </div>
                    <canvas id="myChart" width="115" height="115"></canvas>
                </div>
                <div className="valueInfo centerAlign">
                    <div className={"arrow "+ this.getPosNeg(tmp.oee[2])[1]}></div>
                    <div className="valueContent" ><span>{this.getPosNeg(tmp.oee[2])[0]}%</span> in past 7 days</div>
                </div>
            </div>
            <div className="panelCard horizontalCard availability">
                <h3>Availability</h3>
                <h2>{tmp.availability_data[0]}%</h2>
                <div className="percArea">
                    <div className={["percBar "+tmp.availability_data[1]]}><div className="perc" style={this.styleOptions(tmp.availability_data[0])}></div></div>
                </div>
                <div className="valueInfo">
                    <div className={"arrow "+ this.getPosNeg(tmp.availability_data[2])[1]}></div>
                    <div className="valueContent"><span>{this.getPosNeg(tmp.availability_data[2])[0]}%</span> in past 7 days</div>
                </div>
            </div>
            <div className="panelCard horizontalCard performance">
                <h3>Performance</h3>
                <h2>{tmp.performance_data[0]}%</h2>
                <div className="percArea">
                    <div className={["percBar "+tmp.performance_data[1]]}><div className="perc" style={this.styleOptions(tmp.performance_data[0])}></div></div>
                </div>
                <div className="valueInfo">
                    <div className={"arrow "+ this.getPosNeg(tmp.performance_data[2])[1]}></div>
                    <div className="valueContent"><span>{this.getPosNeg(tmp.performance_data[2])[0]}%</span> in past 7 days</div>
                </div>
            </div>
            <div className="panelCard horizontalCard quality">
                <h3>Quality</h3>
                <h2>{tmp.quality_data[0]}%</h2>
                <div className="percArea">
                    <div className={["percBar "+tmp.quality_data[1]]}><div className="perc" style={this.styleOptions(tmp.quality_data[0])}></div></div>
                </div>
                <div className="valueInfo">
                    <div className={"arrow "+ this.getPosNeg(tmp.quality_data[2])[1]}></div>
                    <div className="valueContent"><span>{this.getPosNeg(tmp.quality_data[2])[0]}%</span> in past 7 days</div>
                </div>
            </div>
        </div>
        );
    }
}

export default OeeCard;