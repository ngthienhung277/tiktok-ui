import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ sidebar, data, ...passProps }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper', {sidebar})} {...passProps} state= {data}>
            <Image 
            className={cx('avatar')} 
            src={data?.avatar} 
            alt={data?.avatar} 
            />
            <div className={cx('info')}>
                <div className={cx('username')}>
                    <span>{data?.nickname}</span>
                    {data?.tick && <FontAwesomeIcon className={cx('verified')} icon={faCheckCircle}/>}
                </div>
                <div className={cx('name')}>{data?.full_name || `${data?.first_name} ${data.last_name}`}</div>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
