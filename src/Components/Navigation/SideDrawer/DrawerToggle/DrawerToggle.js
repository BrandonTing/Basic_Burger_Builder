import React from 'react';

import DrawerToggleStyle from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div
        className = {DrawerToggleStyle.DrawerToggle}    
        onClick = {props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;