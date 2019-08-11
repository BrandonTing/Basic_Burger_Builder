import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import ContactDataStyle from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }, 
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalprice,
            customer: {
                name: 'BrandonTing',
                address: {
                    street: 'TestStreet',
                },
                email: 'test@test.com'
            },
        }
        axios.post('/orders.json', order)
            .then(response=> {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error=> {
                this.setState({loading: false});
            });
    }

    render(){
        let form = (
            <form>
                <input className = {ContactDataStyle.Input} type="text" name="name" placeholder="Your name" />
                <input className = {ContactDataStyle.Input} type="email" name="email" placeholder="Your email" />
                <input className = {ContactDataStyle.Input} type="text" name="street" placeholder="Street" />
                <input className = {ContactDataStyle.Input} type="text" name="postalCode" placeholder="Postal Code" />
                <Button btnType = 'Success' clicked = {this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className = {ContactDataStyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;
