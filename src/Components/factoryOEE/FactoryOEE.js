import React from 'react';
import './factoryOEE.css';
    
export class FactoryOEE extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            prodline : []            
        };
    }

    static getDerivedStateFromProps(props){
        let allFactoryData=props.factoriesData;
        let allFactoryDataUpdated = [];
        for (let key in allFactoryData) {
            let factoryData = {
                'id': key,
                'value':[allFactoryData[key][0],allFactoryData[key][2],allFactoryData[key][1],allFactoryData[key][15]]
            }
            allFactoryDataUpdated.push(factoryData)
        }
        return {
            prodline:allFactoryDataUpdated
        }
    }

    render() {
        var tmp = this.state.prodline;
        return (
            <div id="factoryOEE" ref="factoryOEE">
            {tmp.map((item,key) => (
                <div key={item.id} data-cardid={item.id} className="prodLineCard" onClick={() => this.props.triggerNavigation(item.id)}>
                    <div className="content">
                        <h2>{item.value[0]}</h2>
                        <h4>{item.value[3]}</h4>
                        <div className="bottomBlock">
                            <div className="leftSection">
                                <div className={["colorDot "+item.value[1]]}></div>
                                <div className="oeeVal">{item.value[2]}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        );
    }
}

export default FactoryOEE;