import React, { useEffect, useRef } from 'react';
import useEventListener from '@marketgoo/ola/dist/hooks/useEventListener';
import ButtonIcon from '@marketgoo/ola/dist/ButtonIcon';
import Icon from '@marketgoo/ola/dist/Icon';
import dialogPolyfill from 'dialog-polyfill';
import { default as PT } from 'prop-types';
import cx from 'classnames';

const scrollBarWidth = getScrollbarWidth();

const CustomOlaModal = ({
    open,
    closable,
    onClose,
    onOpen,
    variant,
    className,
    children,
    ...props
}) => {
    const modal = useRef(null);
    const scrollingElement = document.scrollingElement;

    // We can't use useOutsideEvent hook. Dialog height and width is 100%
    const clickOutside = event => {
        if (closable && modal && modal.current === event.target) {
            const rect = modal.current.getBoundingClientRect();
            const isInDialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                modal.current.close();
            }
        }
    };

    useEventListener(modal, 'cancel', event => {
        if (!closable) event.preventDefault();
    });
    useEventListener(modal, 'close', () => {
        onClose();
        releaseScroll(scrollingElement);
    });
    useEffect(() => {
        dialogPolyfill.registerDialog(modal.current);
    }, []);
    useEffect(() => {
        if (modal.current && open && !modal.current.open) {
            onOpen();
            blockScroll(scrollingElement);
            modal.current.showModal();
        }
    });
    /*
     * Listen to open flag changes to close correctly the modal when you don't click on the close button
     * */
    useEffect(() => {
        if (!open) {
            modal.current.close();
        }
    }, [open]);

    return (
        <dialog
            className={cx(
                'ola_modal',
                variant && `is-${variant}`,
                { 'is-closable': closable },
                className,
            )}
            {...props}
            ref={modal}
            onClick={clickOutside}>
            {open && (
                <>
                    <div className="ola_modal-container">{children}</div>
                    {closable && (
                        <ButtonIcon
                            type="button"
                            onClick={() => modal.current.close()}
                            className={'ola_modal-close'}>
                            <Icon name="close" />
                        </ButtonIcon>
                    )}
                </>
            )}
        </dialog>
    );
};

CustomOlaModal.defaultProps = {
    open: false,
    variant: null,
    onOpen: () => {},
    onClose: () => {},
    closable: true,
};

CustomOlaModal.propTypes = {
    /** Extra className */
    className: PT.string,
    /** open */
    open: PT.bool,
    /** closable */
    closable: PT.bool,
    /** Close event */
    onClose: PT.func,
    /** Open event */
    onOpen: PT.func,
    /** Modal variants */
    variant: PT.oneOf(['center', 'narrow']),
    /** Childen nodes */
    children: PT.oneOfType([PT.string, PT.arrayOf(PT.node), PT.node]).isRequired,
};

export default CustomOlaModal;

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    const inner = document.createElement('div');
    outer.appendChild(inner);

    document.body.appendChild(outer);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

function blockScroll(element) {
    if (element.scrollHeight > element.clientHeight) {
        element.style.overflow = 'hidden';
        element.style.paddingRight = `${scrollBarWidth}px`;
    }
}

function releaseScroll(element) {
    element.style.overflow = null;
    element.style.paddingRight = null;
}
