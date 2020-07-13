import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadingOverlay from './index';

configure({ adapter: new Adapter() });

describe('<LoadingOverlay />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<LoadingOverlay />);
    });
    it('should has the overlay--show class', () => {
        wrapper.setProps({
            show: true,
        });
        expect(wrapper.hasClass('overlay--show')).toBeTruthy();
    });
    it('should has no the overlay-showw class', () => {
        expect(wrapper.hasClass('overlay--show')).toBeFalsy();
    });
});
