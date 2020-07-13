import Field from '@marketgoo/ola/dist/Field';
import React from 'react';
import CustomOlaInput from '../CustomOlaInput';

import './style.css';

const FieldInput = props => {
    return (
        <div className="fieldInput">
            <Field hint={props.required ? '(required)' : ''} id={props.name} label={props.label}>
                <CustomOlaInput
                    name={props.name}
                    placeholder={props.placeholder ? props.placeholder : props.label}
                    type={props.type}
                    onChange={props.onChange}
                />
            </Field>
        </div>
    );
};

export default FieldInput;
