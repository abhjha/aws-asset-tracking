import React from 'react';
import './index.css';

export class Breadcrumb extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            time: 0,
            start: 0
        }
    }

    startTimer = () => {
        this.setState({
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 60000);
    }

    resetTimer = () => {
        this.setState({time: 0})
    }
    
    componentDidMount(){
        this.startTimer();
    }

    componentDidUpdate() {
        if((this.state.time/60000)> 5){
            this.resetTimer();
        }
    }

    render() {
        return (
            <div className="breadcrumb-bar">
                <ul>
                    {this.props.breadcrumbObject.map((item, index) => {
                    return (<li key={index}>{item}</li>)
                    })}
                </ul>
                <div className="breadcrumb-timer">Last updated at <b>{parseInt(this.state.time/60000)} minutes ago.</b></div>
            </div>
        );
    }
}

export default Breadcrumb;

