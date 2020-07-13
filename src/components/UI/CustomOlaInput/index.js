import React from 'react';
import { default as PT } from 'prop-types';
import cx from 'classnames';

const CustomOlaInput = ({ className, error, type, ...props }) => {
    return type === 'textarea' ? (
        <textarea
            type={type}
            className={cx('ola_input', { 'is-invalid': error }, className)}
            onChange={props.onChange}
            {...props}
        />
    ) : (
        <input
            type={type}
            className={cx('ola_input', { 'is-invalid': error }, className)}
            onChange={props.onChange}
            {...props}
        />
    );
};

CustomOlaInput.defaultProps = {
    type: 'text',
    className: null,
    error: false,
};

CustomOlaInput.propTypes = {
    /** Input valid types (texarea return texarea html tag) */
    type: PT.oneOf([
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'textarea',
        'time',
        'url',
        'week',
    ]),
    /** Extra className */
    className: PT.string,
    /** Input is invalid */
    error: PT.bool,
};

export default CustomOlaInput;
