import React, {Component} from 'react';

import LayoutStyle from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false,});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    
    render () {
        return (
            <React.Fragment>
                <Toolbar clicked = {this.sideDrawerToggleHandler} />
                <SideDrawer 
                    closed = {this.sideDrawerClosedHandler}
                    open = {this.state.showSideDrawer} />
                <main className = {LayoutStyle.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>    
        )
    }
};

export default Layout;