import React from 'react';
import NavigationItemsStyle from './NavigationItems.module.css';
import NavagationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className = {NavigationItemsStyle.NavigationItems}>
        <NavagationItem link="/" active>Burger Builder</NavagationItem>
        <NavagationItem link="/">Checkout Page</NavagationItem>
    </ul>
);

export default navigationItems;