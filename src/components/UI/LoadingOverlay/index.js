import Spinner from '@marketgoo/ola/dist/Spinner';
import React from 'react';
import './style.css';

const LoadingOverlay = props => {
    const getClasses = () => {
        if (props.show) {
            return 'overlay overlay--show';
        } else {
            return 'overlay';
        }
    };

    return (
        <div className={getClasses()}>
            <Spinner className={null} size="big" />
        </div>
    );
};

export default LoadingOverlay;
