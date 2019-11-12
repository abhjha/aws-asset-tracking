import React from 'react';
import { withRouter } from "react-router-dom";




class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMenuId: 0,
            menuItem:['Dashboard','Zone Details'],
        }
    }

    setActiveState = (e) => {
        if (e.target.parentElement.classList.contains('menu-heading-container')) {
            const selectedMenuId = e.target.parentElement.id;
            this.setState({ selectedMenuId });
            this.props.history.push({ pathname: '/' });
            switch (selectedMenuId) {
                case "0": this.props.history.push({ pathname: '/' }); break;
                case "1": this.props.history.push({ pathname: '/zoneView',state: {zoneId:'zone001'} }); break;
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
                    SMART FACTORY FABRIC
                    Material Visibility
                </div>
                <div onClick={this.setActiveState} className="menu-option-items">
                    {this.state.menuItem.map((item, index) => {
                        return (
                            <div id={index} key={index} className={'menu-heading-container ' + (parseInt(this.state.selectedMenuId) === index ? 'active' : '')}>
                                {/* <img src={logoItems[index]} alt="menu-icons" /> */}
                                <div className='menu-item'> {item}  </div>
                            </div>
                        )
                    })}
                    <div className="menu-logout">
                        <p style={this.UserStyle}>abcnx7868</p>
                        <p style={this.LineStyle}>Line Operator</p>
                        <button className="logout-button">LOGOUT</button>
                    </div>
                </div>
            </div>


        )
    }
}
export default withRouter(Menu);
