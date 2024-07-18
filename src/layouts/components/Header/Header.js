import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useContext } from 'react'

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, LanguageIcon, QuestionMarkIcon, KeyboardIcon, UserIcon, TikTokCoinIcon, GearIcon, LogOutIcon, PlusIcon, EllipsisVerticalIcon  } from '~/components/Icons';
import Image from '~/components/Image';
import SearchInput from '../Search Input';
import {ModalContext} from '~/components/ModalProvider';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <QuestionMarkIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
];

function Header({ stretch }) {
    const currentUser = false;
    const context = userContext(MondalContext);

    // Handle logic 
    const handleMenuChange = (item) => {
        console.log(item);
    };

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <TikTokCoinIcon />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <GearIcon />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <LogOutIcon />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', {stretch: stretch})}>
                <Link to={config.routes.home}
                className={cx('logo-link')} >
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <div><SearchInput /> </div>

                <div className={cx('actions')}>
                    {currentUser ?
                        <Button to={config.routes.upload}><PlusIcon className={cx('upload-icon')}/>Upload</Button> 
                        :
                        <Button onClick={context.handleShowModal}><PlusIcon className={cx('upload-icon')} /> Upload</Button>
                    }
                
                    {currentUser ? (
                        
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                    <Button primary onClick={context.handleShowModal}>Log in</Button>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/473785642638dfac32b64609e0f48430.jpeg?x-expires=1663311600&x-signature=hea4ox%2FVzTIg21IlNg8k7TAsB%2Fc%3D"
                                alt="yoonsulll"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <EllipsisVerticalIcon className={cx('more-icon')}/>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
