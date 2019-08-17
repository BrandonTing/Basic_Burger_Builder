import React, {Component} from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../Components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrder();
    }

    render(){
        let orderList = null;
        if (this.props.loading) {
            orderList = <Spinner />
        } else if ( !this.props.orders ) {
            orderList = (
                <div style = {{textAlign: 'center'}}>
                    <p>No Existing Orders.</p>
                    <p>Let's build own burger in Burger Builder Page!</p>
                </div>
            );    
        } else {
            orderList = (
                this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients = {order.ingredients}
                        price = {(+order.price).toFixed(1)}
                        />   
                ))
            )    
        }
        return(
            <div>
                {orderList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder : () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));