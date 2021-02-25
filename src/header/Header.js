import React from 'react';
import logo_blue from '../assets/images/logo_blue.svg';

import './Header.css';

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            title: "React Internship",
        }
    }

    render(){
        const {title} = this.state;

        return(
            <header>
                <div className="header__logo">
                    <img src={logo_blue} alt="Onix logo" width="117" height="30"/>
                </div>
                <div className="header__title">{title}</div>
            </header>
        );
    }
}

export default Header;
