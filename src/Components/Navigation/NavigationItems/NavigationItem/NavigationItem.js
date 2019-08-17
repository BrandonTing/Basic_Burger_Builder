import React from 'react';
import { NavLink } from 'react-router-dom';

import NavigationItemStyle from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className = {NavigationItemStyle.NavigationItem}>
        <NavLink 
            to={props.link}
            exact
            activeClassName={NavigationItemStyle.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;