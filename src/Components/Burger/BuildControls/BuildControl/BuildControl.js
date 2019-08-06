import React from 'react';
import BuildContolStyle from './BuildControl.module.css'

const buildControl = (props) => (
    <div className = {BuildContolStyle.BuildControl}>
        <div className = {BuildContolStyle.Label}>{props.label}</div>
        <button 
            className = {BuildContolStyle.Less} 
            onClick={props.removed} 
            disabled = {props.disabled} >Less</button>
        <button 
            className = {BuildContolStyle.More} 
            onClick={props.added} 
            >More</button>
    </div>
);

export default buildControl;