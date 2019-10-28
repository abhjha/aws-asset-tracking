import React from 'react';
import './css.css';

export class ProdLineOEE extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
        prodline : [{"id":"PL1","value":["red","35"]}]
    };
  }
//   static getDerivedStateFromProps(props){
//       console.log("factory data: ",props.factoryData);
//     let allFactoryData=props.factoryData;
//     let allFactoryDataUpdated = [];
//     for (let key in allFactoryData) {
//         let factoryData = {
//             'id': key,
//             'value':[allFactoryData[key][0],allFactoryData[key][2],allFactoryData[key][1],allFactoryData[key][3]]
//         }
//         allFactoryDataUpdated.push(factoryData)
//     }
//     return {
//         prodline:allFactoryDataUpdated
//     }

//   }

  alertText(count){
    var output = "";
        if(count>0){
            output = count + " Alerts";
        }
    return output;
  }

   render() {
    var tmp = this.state.prodline;
    
      return (
        <div id="productionLineOEE" ref="productionLineOEE">
        {tmp.map((item) => (
            <div key={item.id} data-cardid={item.id} className="prodLineCard" onClick={() => this.props.triggerNavigation(item.id)}>
                <div className="content">
                    <h2>{item.id}</h2>
                    <div className="bottomBlock">
                        <div className="leftSection">
                            <div className={["colorDot "+item.value[0]]}></div>
                            <div className="oeeVal">{item.value[1]}%</div>
                        </div>
                        <div className="rightSection">
                            {/*this.alertText(item.value[3])*/}
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
      );
   }
}

export default ProdLineOEE;