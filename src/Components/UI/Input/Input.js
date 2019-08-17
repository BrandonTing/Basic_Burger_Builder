import React from 'react';

import InputStyle from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClass = [InputStyle.InputElement];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClass.push(InputStyle.Invalid);
        validationError = <p className = {InputStyle.ValidationError}>Please enter a valid value!</p>;
    }

    switch (props.elementtype) {
        case ('input'): 
            inputElement = <input 
                {...props.elementconfig}
                onChange  = {props.changed}
                className = {inputClass.join(' ')} 
                value ={props.value} />;
            break;
        case ('textArea'):
            inputElement = <textarea 
                {...props.elementconfig} 
                onChange = {props.changed}
                className = {inputClass.join(' ')} 
                value ={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className = {inputClass.join(' ')} 
                    value ={props.value}
                    onChange = {props.changed}>
                    {props.elementconfig.options.map(option => (
                        <option key = {option.value} value = {option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;        
        default:  
            inputElement = <input 
                {...props} 
                className = {inputClass.join(' ')}
                onChange = {props.changed} />;
    }

    return(
        <div className = {InputStyle.Input}>
            <label className = {InputStyle.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;

