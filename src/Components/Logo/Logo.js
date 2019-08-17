import React from 'react';

import LogoImg from '../../Assets/Images/burger-logo.png';
import LogoStyle from './Logo.module.css';

const logo = (props) => (
    <div className = {LogoStyle.Logo} style = {{height: props.height}} >
        <img src = {LogoImg} alt = "MyBurgerBrand" />
    </div>
);

export default logo;