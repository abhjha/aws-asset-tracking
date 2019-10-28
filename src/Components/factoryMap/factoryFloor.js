import React from 'react';
import $ from 'jquery';
import './css.css';
import Factory from '../../Assets/factoryMap.png';
    
var outputObject = {};

export class FactoryFloor extends React.Component {

	constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);

    this.state = {
        factory : {
           
        },
    };
  }

  static getDerivedStateFromProps(props){
    const factoryData = props.factoryData;
    let factoryDataUpdated = {}
    for (let key in props.factoryData) {
        const newKey = `${key.toLowerCase()}`
        factoryDataUpdated[newKey] = [factoryData[key][0],factoryData[key][2],factoryData[key][1],factoryData[key][5],factoryData[key][4]]
    }
    return {factory: factoryDataUpdated}
}

  handleLoad(){
    var data = this.state.factory,
        markers = $(".roundMarker span");
        markers.parent().each(function(i, asset){
            var _data = data[$(asset).attr("data-prodlineid")];
            $(asset).addClass(_data[1]);
        });
        markers.mouseover(function(e){
            e.stopPropagation();
            var curObject = $(e.target).parent(),
            _data = data[curObject.attr("data-prodlineid")];
            if(_data.length>0){
                var top = $(e.target).parent().position().top,
                left = $(e.target).parent().position().left,
                infoCard = $(".infoCard");
                infoCard.find("h2").html(_data[0]); // Asset Name
                infoCard.find("h4").html(_data[2]+"%"); // OEE Val
                infoCard.find(".percArea .percBar").removeClass("critical warning normal");
                infoCard.find(".percArea .percBar").addClass(_data[1]); // Perc bar
                infoCard.find(".percBar .perc").width(_data[2]+"%"); // Asset Availability
                var _left = (left - 110); 
                if(top >= 300){
                    top = 110;
                }
                if(_left < 110){
                    _left = "110";
                }
                infoCard.show().css({ 'top': (top+ 30)+'px','left':_left+'px' });  
            }
        }).mouseout(function(e){
            $(".infoCard").hide();
        });
  }

  componentDidUpdate() {
    this.handleLoad();
  }

  navigateTopage(asset){
    //window.location ='/prodline';
}


   render() {
      return (
        <div id="factoryView" ref="factoryView">
            <div className="controls">
                {<ul>
                    <li className="fullScreen" onclick='controlHandler("fullscreen")'><span className="glyphicon glyphicon glyphicon-fullscreen"></span></li>
                    <li className="zoomIn" onclick='controlHandler("zoomin")'><span className="glyphicon glyphicon-zoom-in"></span></li>
                    <li className="zoomOut" onclick='controlHandler("zoomout")'><span className="glyphicon glyphicon-zoom-out"></span></li>
                    <li className="rightMove"  onclick='controlHandler("right")'><span className="glyphicon glyphicon glyphicon-chevron-right"></span></li>
                    <li className="leftMove"  onclick='controlHandler("left")'><span className="glyphicon glyphicon glyphicon-chevron-left"></span></li>
                    <li className="topMove"  onclick='controlHandler("top")'><span className="glyphicon glyphicon-chevron-up"></span></li>
                    <li className="bottomMove"  onclick='controlHandler("bottom")'><span className="glyphicon glyphicon-chevron-down"></span></li>
                </ul>}
            </div>
            <div className="imageInfoContainer">
                <div className="innerImage">
                    <img src={Factory} className="factoryMapImage"></img>
                    <div className="roundMarker line1 prodline1" onClick={() => this.navigateTopage(this.state.factory.prodline1)} data-prodlineid="br-l1">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                    <div className="roundMarker line2 prodline2" onClick={() => this.navigateTopage(this.state.factory.prodline2)} data-prodlineid="br-l2">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                    <div className="roundMarker  line3 prodline3" onClick={() => this.navigateTopage(this.state.factory.prodline3)} data-prodlineid="br-l3">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                    <div className="roundMarker line4 prodline4" onClick={() => this.navigateTopage(this.state.factory.prodline4)} data-prodlineid="br-l4">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                    <div className="roundMarker line5 prodline5" onClick={() => this.navigateTopage(this.state.factory.prodline5)} data-prodlineid="br-l5">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                    <div className="roundMarker line6 prodline6" onClick={() => this.navigateTopage(this.state.factory.prodline6)} data-prodlineid="br-l6">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                    <div className="infoCard">
                        <h2>Production Line 1</h2>
                        <h3>OEE</h3>
                        <h4>56%</h4>
                        <div className="percArea">
                            <div className="percBar"><div className="perc"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
   }
}

export default FactoryFloor;