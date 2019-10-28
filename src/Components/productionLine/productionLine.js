import React from 'react';
import $ from 'jquery';
import './css.css';
import ProdLineImage from '../../Assets/prd01.png';
    
export class ProductionLine extends React.Component {

	constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {
        prodLineID: "PRD01",
        isProdOneEnabled: true,
        assets : {
           // "compressor1":["Compressor 1","critical","45.34","critical","20","critical","85","warning","95","normal", 1], 
            //"conveyorBelt1":["Conveyor Belt 1","warning","75.2","warning","90.2","normal","73","warning","75","warning", 2]
        }
        
    };
  }
  
  static getDerivedStateFromProps(props){
    const allLineData=props.lineData;
    let allLineDataUpdated = {};
    for (let key in props.lineData) {
        allLineDataUpdated[key]=[allLineData[key][0],allLineData[key][1],allLineData[key][2],allLineData[key][3],allLineData[key][5],allLineData[key][6],allLineData[key][8],allLineData[key][9],allLineData[key][11],allLineData[key][12],allLineData[key][13]]
    }
    return {
        assets:allLineDataUpdated
    }
}

  handleLoad(){
    var assets = $(".asset"),
        data = this.state.assets;
        if(Object.keys(data).length>0 ){
            assets.each(function(i, asset){
                var _data = data[$(asset).attr("data-assetid")];
                $(asset).find(".assetSelect").addClass(_data[1]);
                $(asset).find(".roundMarker").addClass(_data[1]);
                if(_data[1] != "normal"){
                    $(asset).find(".roundMarker span").html(_data[10]);
                }
            });
            assets.hover(function(e){
                e.stopPropagation();
                var curObject = $(e.target).parent(),
                    _data = data[curObject.attr("data-assetid")];
                    if(_data){
                        var infoCard = $(".info");
                        infoCard.show();
                        infoCard.find(".selected h2 span").html(_data[0]); // Asset Name
                        var _dec = (_data[2] + "").split(".");
                        infoCard.find(".selected .oeeVal .number").html(_dec[0]); // Asset OEE
                        infoCard.find(".selected .leftsection .percBar .perc").width(_dec[0]+"%"); // Asset OEE Graph
                        infoCard.find(".selected .oeeVal .decimal").html("."+_dec[1]+"%"); // Asset OEE
                        if(!_dec[1]){
                            infoCard.find(".selected .oeeVal .decimal").html("%"); // Asset OEE
                        }
                        infoCard.find(".selected .leftsection .percBar, .selected .rightsection .percBar").removeClass("critical warning normal");
                        infoCard.find(".selected .leftsection .percBar").addClass(_data[3]); // Criticality of OEE
                        infoCard.find(".selected .rightsection .availability .percBar .perc").width(_data[4]+"%"); // Asset Availability
                        infoCard.find(".selected .rightsection .availability .value").html(_data[4]+"%"); // Asset Availability
                        infoCard.find(".selected .rightsection .availability .percBar").addClass(_data[5]); // Criticality of Availability
        
                        infoCard.find(".selected .rightsection .performance .percBar .perc").width(_data[6]+"%"); // Asset Availability
                        infoCard.find(".selected .rightsection .performance .value").html(_data[6]+"%"); // Asset Availability
                        infoCard.find(".selected .rightsection .performance .percBar").addClass(_data[7]); // Criticality of Availability
        
                        infoCard.find(".selected .rightsection .quality .percBar .perc").width(_data[8]+"%"); // Asset Availability
                        infoCard.find(".selected .rightsection .quality .value").html(_data[8]+"%"); // Asset Availability
                        infoCard.find(".selected .rightsection .quality .percBar").addClass(_data[9]); // Criticality of Availability
                    }
            }).mouseout(function(e){
                $(".info").hide();
            });
        }
  }

  componentDidUpdate() {
    this.handleLoad();
  }

   render() {
      return (
        <div id="productionLine" ref="productionLine">
        <div className="innerImage">
            <img src={ProdLineImage} className="prodLineImage"/> 
            <div className="asset compressorOne"onClick={() => this.props.triggerNavigation('BR-C101')}data-assetid="BR-C101">
                <div className="assetHover">
                    <div className="roundMarker">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                </div>
            </div>
            <div className="asset conveyorBeltOne" onClick={() => this.props.triggerNavigation('BR-CB101')} data-assetid="BR-CB101">
                <div className="assetHover">
                    <div className="roundMarker">
                        <div className="arrow bottom"></div>
                        <span>&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="info">
            <div className="unselected">
                <h1>Please Select An Asset!</h1>
            </div>
            <div className="selected">
                <h2>Asset Name: <span>Motor 29</span></h2>
                <div className="leftsection">
                    <h3>OEE</h3>
                    <div className="oeeVal"><span className="number">57</span><span className="decimal">.37%</span></div>
                    <div className="percBar"><div className="perc"></div></div>
                </div>
                <div className="rightsection">
                    <div className="critRow availability">
                        <div className="leftBar">
                            <div className="critTitle">Availability</div>
                            <div className="percArea">
                                <div className="percBar"><div className="perc"></div></div>
                            </div>
                        </div>
                        <div className="value">85%</div>
                    </div>
                    <div className="critRow quality">
                        <div className="leftBar">
                            <div className="critTitle">Quality</div>
                            <div className="percArea">
                                <div className="percBar"><div className="perc"></div></div>
                            </div>
                        </div>
                        <div className="value">85%</div>
                    </div>
                    <div className="critRow performance">
                        <div className="leftBar">
                            <div className="critTitle">Performance</div>
                            <div className="percArea">
                                <div className="percBar"><div className="perc"></div></div>
                            </div>
                        </div>
                        <div className="value">85%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      );
   }
}

export default ProductionLine;