import Field from '@marketgoo/ola/dist/Field';
import React from 'react';

const FieldInput = props => {
    return (
        <Field hint={props.required ? '(required)' : ''} id={props.name} label={props.label}>
            <input
                className="ola_input"
                name={props.name}
                placeholder={props.placeholder ? props.placeholder : props.label}
                type={props.type}
                onChange={props.onChange}
            />
        </Field>
    );
};

export default FieldInput;
