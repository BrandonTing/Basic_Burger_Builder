import React from 'react';

import NavigationItemsStyle from './NavigationItems.module.css';
import NavagationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className = {NavigationItemsStyle.NavigationItems}>
        <NavagationItem link="/">Burger Builder</NavagationItem>
        {props.isAuth
            ?<NavagationItem link="/orders">Orders</NavagationItem>:null}
        {!props.isAuth
            ?<NavagationItem link="/login">Login</NavagationItem>
            :<NavagationItem link="/logout">Logout</NavagationItem>}
    </ul>
);

export default navigationItems;