import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../Components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
class Orders extends Component{
    state = {
        orders: null,
        loading: true,
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
                if (res.data) {
                    const fetchedOrders =[];
                    for (let key in res.data){
                        fetchedOrders.push({
                            ...res.data[key],
                            id:key
                        })
                    }
                    this.setState({loading:false, orders: fetchedOrders});
                } else {
                    this.setState({loading:false});
                }
            })
            .catch(error => {
                this.setState({loading:false});
            })
    }

    render(){
        let orderList = (
            <div style = {{textAlign: 'center'}}>
                <p>No Existing Orders.</p>
                <p>Let's build own burger in Burger Builder Page!</p>
            </div>
        );

        if (this.state.orders) {
            orderList = (
                this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients = {order.ingredients}
                        price = {(+order.price).toFixed(1)}
                        />   
                ))
            )    
        };
        
        return(
            <div>
                {orderList}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);