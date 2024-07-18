import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';


import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';
import MenuHeader from './MenuHeader';
import Popper from '~/components/Popper';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentMenu = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isSubMenu = !!item.subMenu;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isSubMenu) {
                            setHistory((prev) => [...prev, item.subMenu]);
                            document.body.classList.add(cx('lock-scroll'));
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    
    
    const handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
        if (history.length < 3) {
            document.body.classList.remove(cx('lock-scroll'));
        }
    };
    
    const renderResult = (attrs) => (
        <div className={cx('more-tab')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('more-list')}>
                {history.length > 1 && <MenuHeader title={currentMenu.title} onBack={handleBackMenu} />}
                <div className={cx('list-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );
    
    // Reset to first page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
        document.body.classList.remove(cx('lock-scroll'));
    }
    

    return (
        <HeadlessTippy
            interactive
            delay={[0, 700]}
            offset={[10, 10]}
            zIndex= '99'
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </HeadlessTippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
