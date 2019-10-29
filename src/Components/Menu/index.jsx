import React from 'react';
import { withRouter } from "react-router-dom";
import logo from './TURNKEYFAI.png';
import plantIcon from './plantIcon.png'
import alertIcon from './alertIcon.png';
import analyticsIcon from './analyticsIcon.png';
import CTIcon from './CTIcon.png';

import './index.css';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMenuId: 0,
            menuItems: ['Dashboard', 'Asset Registry', 'Device Registry', 'Edit Asset','Detach Thing',""],
        }
    }

    setActiveState = (e) => {
        if (e.target.parentElement.classList.contains('menu-heading-container')) {
            const selectedMenuId = e.target.parentElement.id;
            this.setState({ selectedMenuId });
            switch (selectedMenuId) {
                case "0": this.props.history.push({ pathname: '/' }); break;
                case "1": this.props.history.push({ pathname: '/assetRegistry' }); break;
                case "2": this.props.history.push({ pathname: '/deviceRegistry' }); break;
                case "3": this.props.history.push({ pathname: '/editAsset' }); break;
                case "4": this.props.history.push({ pathname: '/detachThing' }); break;
                default: this.props.history.push({ pathname: '/' });
            }
        }
    }

    UserStyle = {
        color: '#8a8a8a',
        marginLeft: '20px',
        fontSize: '16px',
    };

    LineStyle = {
        color: '#8a8a8a',
        marginLeft: '20px',
        fontSize: '16px',
        marginTop: '5px'
    };

    render() {
        
        return (
            <div onClick={this.setActiveState} className="menu-container">
                <div className="menu-heading">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div onClick={this.setActiveState} className="menu-option-items">
                    {this.state.menuItems.map((item, index) => {
                        return (
                            <div id={index} key={index} className={'menu-heading-container ' + (parseInt(this.state.selectedMenuId) === index ? 'active' : '')}>
                                {/* <img src={logoItems[index]} alt="menu-icons" /> */}
                                <div className='menu-item'> {item}  </div>
                            </div>
                        )
                    })}
                    <div></div>
                    <p style={this.UserStyle}>abcnx7868</p>
                    <p style={this.LineStyle}>Line Operator</p>
                    <button className="logout-button"
                    >LOGOUT</button>
                </div>
            </div>


        )
    }
}
export default withRouter(Menu);
