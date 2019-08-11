import React from 'react';

import NavigationItemsStyle from './NavigationItems.module.css';
import NavagationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className = {NavigationItemsStyle.NavigationItems}>
        <NavagationItem link="/">Burger Builder</NavagationItem>
        <NavagationItem link="/orders">Orders</NavagationItem>
    </ul>
);

export default navigationItems;