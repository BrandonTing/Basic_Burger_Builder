import React from 'react';

import ButtonStyle from './Button.module.css';

const button = (props) => (
    <button
        className = {[ButtonStyle.Button, ButtonStyle[props.btnType]].join(' ')}
        onClick= {props.clicked}
        disabled={props.disabled}>{props.children}</button>
);

export default button;