import React from 'react';
import UserIcon from '../../Assets/user-icon.png';
import './css.css';

export class HeaderBar extends React.Component{
    render() {
        return (
            <div className="header-bar">
                <button className="back-button" >&lt;</button>
                <p className="title">DELOITTE IOT SOLUTIONS</p>
                <img src={UserIcon} className="user-profile-icon"/> 
                <p className="user-dtls">Admin</p> 
            </div>
        );
    }
}

export default HeaderBar;

