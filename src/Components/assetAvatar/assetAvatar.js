import React from 'react';
import { ReactDOM } from 'react-dom';
import $ from 'jquery';
import './css.css';
import ConveyorBelt from '../../Assets/conveyorBelt.jpg';
import Compressor from '../../Assets/compressor.jpg';
    
export class AssetAvatar extends React.Component {

	constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);

    this.state = {
        falg:true,
        assetID:"",
        imageSrc:"",
        // imageMapping: {
        //     "BR-C101":"compressor.jpg",
        //     "BR-CB101":"conveyorBelt.jpg",
        //    },
        assetid:"",
        imagesrc:"",
        /*values: [ // ASS01
            {'name':"vibration", 'value':["140","120","critical", "Hz"]} 
        ]*/
        values: [ // ASS02
            {'name':"temperature", 'value':["250","120","normal", "F"]},
            {'name':"camera", 'value':["80","70","normal", "%"]},
            {'name':"rfid", 'value':["70","58","warning", "%"]}
        ]
    };
  }

static getDerivedStateFromProps(props){

    let assetID=props.assetID;
    let imgsrc=ConveyorBelt;
    if(assetID==="BR-C101"){
        imgsrc=Compressor;
    }
    return {
        assetID: assetID,
        imagesrc:imgsrc
    }
}

  handleLoad(){
    var element = this.refs.assetAvatar;
    var sensors = $(".sensor"),
        that = this.state;
        sensors.each(function(i, sensor){
            var sensorType = $(sensor).attr("type"),
                currSequence = $(sensor).attr("data-sequence");
            $(sensor).addClass(that.values[currSequence].value[2]);
        });
        sensors.hover(function(e){
            var curObject = $(e.target),
                top = $(e.target).position().top,
                left = $(e.target).position().left,
                currSequence = curObject.attr("data-sequence"),
                infoCard = $(".info"),
                sensorType = curObject.attr("type"),
                thresholdTitle = "Threshold "+sensorType,
                currentTitle = "Current "+sensorType,
                currentData = that.values[currSequence].value[1]+ " " +curObject.attr("data-valueType"),
                thresholdData = that.values[currSequence].value[0]+ " " +curObject.attr("data-valueType"),
                infoCardTitle = curObject.attr("type") + " Details";

            infoCard.find(".threshold .leftTitle").html(thresholdTitle);
            infoCard.find(".current .leftTitle").html(currentTitle);
            infoCard.find(".threshold .rightData").html(thresholdData);
            infoCard.find(".current .rightData").html(currentData);
            infoCard.find("h3").html(infoCardTitle);
            infoCard.show().css({ 'top': (top+ 50)+'px','left':(left - 110)+'px' });
        }).mouseout(function(e){
            $(".info").hide();
        });
  }

  componentDidUpdate() {
    this.handleLoad();
  }


   render() {
    var tmp = this.state.values;
      return (
            <div id="assetAvatar" ref="assetAvatar" className={this.state.assetID=='BR-C101' ? 'compressor-box' : 'conveyor-belt-box'}>
           
                <img src={this.state.imagesrc} className={this.state.assetID=='BR-C101' ? 'compressor' : 'conveyor-belt'}/> 
                {tmp.map((item,key) => (
                    <div key={item.name} data-sequence={key} className={["sensor "+item.name+ " " + this.state.assetID]} type={item.name} data-valueType={item.value[3]}></div>
                ))}
                <div className="legend-box">
                    <div className="legend-item critical-1"><span></span>Critical</div>
                    <div className="legend-item warning"><span></span>Warning</div>
                    <div className="legend-item normal-1"><span></span>Producing</div>
                </div>
                
                <div className="info">
                    <div className="arrow top"></div>
                    <h3>Details</h3>
                    <div className="infoRow threshold">
                        <span className="leftTitle">Threshold</span>
                        <span className="rightData"></span>
                    </div>
                    <div className="infoRow current">
                        <span className="leftTitle">Current</span>
                        <span className="rightData"></span>
                    </div>
                </div>
            </div>
      );
   }
}

export default AssetAvatar;