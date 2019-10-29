import React, { Component } from 'react';
import './App.css';

export class HealthInfo extends Component {

	constructor(props) {
		super(props);
		this.handleLoad = this.handleLoad.bind(this);
		this.options = {
		 // showSearchTool: this.showSearchTool.bind(this),
		  responsive: true
		};
	 
		this.state = {
		  assetHealthData:[]
		};
	  }

	 componentDidUpdate(){
		this.handleLoad();
	 }
	// static getDerivedStateFromProps(props){
	// 	const assetHealth=props.assetHealth;
	// 	return {
	// 		assetHealthData:assetHealth
	// 	}
	// }
	


//handle data
handleLoad(){
	var orientation = "to top";
		var humidityColor = "#0f8b8d";
		let healthData=this.state.assetHealthData;
		console.log("test",this.state.assetHealthData);
	////	assetHealthData=[{"sensorType":"humidity","current":"60","threshold":"60","unit":"%"},{"sensorType":"temperature","current":"100","threshold":"180","unit":"F"}];
	//	console.log("assetID: ",assetID);
		var colorTwo = "#ffffff 10%";
		var colorThree="#ffffff 100%";		
			
		var element = document.getElementById('humidityDiv');	
		var addRule = (function (style) {
			var sheet = document.head.appendChild(style).sheet;
			return function (selector, css) {
				var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
					return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
				}).join(";");
				sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
			};
		})(document.createElement("style"));

		//For media Queries
		var x = window.matchMedia("(max-width: 1024px) and (min-width: 768px) and (orientation:landscape)");
		lanscapeFunction(x,healthData); // Call listener function at run time
		x.addListener(lanscapeFunction) // Attach listener function on state changes
		var y = window.matchMedia("(min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)");
		portraitFunction(y,healthData); // Call listener function at run time
		y.addListener(portraitFunction); // Attach listener function on state changes
				
		function lanscapeFunction(x,assetHealthData) {
			if (x.matches) { 
				for (const [index, value] of assetHealthData.entries()) {
				var sensorValuePercent=value.current;
				var sensorRedValue=value.threshold;
				var sensorUnit=value.unit;
				let divname="div.humidityDiv-"+index+":before";
				let spanvalue="span.humidityValue-"+index+":before";
				let spanredvalue="span.humidityRedline-"+index+":before";
				addRule(divname, {
					display: "block",
					height: "13vh",
					position: "absolute",
					width: "75%",
					opacity: "0.75",
					content: "''",
					background: "linear-gradient("+orientation+","+humidityColor+" "+sensorValuePercent+"%,"+colorTwo+","+colorThree+")"
				});
				addRule(spanvalue, {
					position: "absolute",
					float:"right",
					bottom:sensorValuePercent-2+"%",
					left:"90%",
					content: sensorValuePercent+sensorUnit,
					color:"#0f8b8d"
				});	
				
				addRule(spanredvalue, {
					position: "absolute",
					/*background:"brown",*/
					"border-bottom": "2px dotted #cc0000",
					bottom:sensorRedValue-4+"%",
					width:70+"%",
					content: sensorRedValue+sensorUnit,
					color:"#cc0000"
					
				});	


			}

					
			} else {
				for (const [index, value] of assetHealthData.entries()) {
					var sensorValuePercent=value.current;
					var sensorRedValue=value.threshold;debugger
					var sensorUnit=value.unit;
					let divname="div.humidityDiv-"+index+":before";
				let spanvalue="span.humidityValue-"+index+":before";
				let spanredvalue="span.humidityRedline-"+index+":before";

					addRule(divname, {
						display: "block",				
						height: "13vh",
						position: "absolute",
						width: "100%",
						opacity: "0.75",
						content: "''",
						background: "linear-gradient("+orientation+","+humidityColor+" "+sensorValuePercent+"%,"+colorTwo+","+colorThree+")"	
									//linear-gradient("to top,#0f8b8d 55%,#ffffff 50%,#ffffff 100%)
						});
						addRule(spanvalue, {
							position: "absolute",					
							float:"right",
							bottom:sensorValuePercent-4+"%",
							left:"74%",
							content: sensorValuePercent+sensorUnit,
							color:"#0f8b8d"
						});	
						addRule(spanredvalue, {
							position: "absolute",
							float:"right", 
							/*background:"brown",*/
							"border-bottom": "2px dotted #cc0000",
							bottom:sensorRedValue-2+"%",
							width:70+"%",
							content: sensorRedValue+sensorUnit,
							color:"#cc0000"
							
						});	

				}
			}
		}
		
		function portraitFunction(y,assetHealthData) {
			
			if (y.matches) { 
				for (const [index, value] of assetHealthData.entries()) {
					var sensorValuePercent=value.current;
					var sensorRedValue=value.threshold;debugger

					let divname="div.humidityDiv-"+index+":before";
				let spanvalue="span.humidityValue-"+index+":before";
				var sensorUnit=value.unit;	
					addRule(divname, {
						display: "block",
						/*background:"pink",*/
						height: "13vh",
						position: "absolute",
						width: "90%",
						opacity: "0.75",
						content: "''",
						background: "linear-gradient("+orientation+","+humidityColor+" "+sensorValuePercent+"%,"+colorTwo+","+colorThree+")"	
										//linear-gradient("to top,#0f8b8d 55%,#ffffff 50%,#ffffff 100%)
					});
					addRule(spanvalue, {
					position: "absolute",
					/*background:"gold",*/
					float:"right",
					bottom:sensorValuePercent-2+"%",
					left:"100%",
					content: sensorValuePercent+sensorUnit,
					color:"#0f8b8d"
				});	
				}

			}
			else
			{
				for (const [index, value] of assetHealthData.entries()) {
					var sensorValuePercent=value.current;
					var sensorRedValue=value.threshold;debugger
					var sensorUnit=value.unit;
					let divname="div.humidityDiv-"+index+":before";
				let spanvalue="span.humidityValue-"+index+":before";

					//vibration Div
				addRule(divname, {
					display: "block",
					height: "13vh",
					position: "absolute",
					width: "100%",
					opacity: "0.75",
					content: "''",
					background: "linear-gradient("+orientation+","+humidityColor+" "+sensorValuePercent+"%,"+colorTwo+","+colorThree+")"	
								//linear-gradient("to top,#0f8b8d 55%,#ffffff 50%,#ffffff 100%)
					});

					addRule(spanvalue, {
						position: "absolute",
						float:"right",
						bottom:sensorValuePercent-4+"%",
						left:"74%",
						content: sensorValuePercent+sensorUnit,
						color:"#0f8b8d"
					});	
					
				}
				
			}
		}
}

  render() {

			console.log(this.state.assetHealthData,"hey asset health data");			
    return (
       <div>
				<title>Order Fulfillment</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="asset.css" />
				<div className="legendDiv">
					<ul className="legend">
					<li><span className="currentVal" /> Current Value</li>
					<li><span className="thresoldVal" /> Threshold</li>
					</ul>
				</div>
				<div id="flex-container">{console.log(this.state.assetHealthData)}
				{this.state.assetHealthData.length>0 && this.state.assetHealthData.map((entry, i) =>
                <div className="flex-item">
					<div className="humidity" >
						<div className="mainDiv">
						<div id={`humidityDiv-${i}`}  className={`humidityDiv-${i}`} >
							<span id={`humidityValue-${i}`} className={`humidityValue-${i}`}/>
							<span id={`humidityRedline-${i}`} className={`humidityRedline-${i}`}><label id={`humidityRedValue-${i}`} className={`humidityRedline-${i}`} /></span>
						</div>
						</div>
						<div className="bar-hd">{entry.sensorType}</div>
					</div>
					</div>
              )}
			</div>	
			</div>		
		);
  }
}

export default HealthInfo;
