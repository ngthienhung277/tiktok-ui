import {
    faSpinner,
    faCircleXmark,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import * as searchService from '~/services/searchService';
import AccountItem from '~/components/AccountItem';

import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function SearchInput() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    
    const inputRef = useRef();

    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }
    const handleHideSearch = () => {
        setShowResult(false);
    }
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')){
            setSearchValue(e.target.value);
        }
    }
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();

        },[debouncedValue]);
        
    return (  
          // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
    <div>
            <HeadlessTippy
            visible = {showResults && searchResults.length > 0}
            interactive
            zIndex= "99"
            render={(attrs) => (
                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <div className={cx('text-results')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/> {searchValue}
                        </div>
                        <h4 className={cx('search-label')}>Accounts</h4>
                        {searchResults.map((result) => {
                        return <AccountItem
                            key={result.id}
                            data ={result}
                            onClick = {handleHideSearch}
                            ></AccountItem>
                            
                        })}
                        <Link to={`/search/user/${searchValue}`} state = {searchValue} className ={cx('search-btn')} onClick= {handleHideSearch}><div className={cx('view-all')}>View all results for "{searchValue}"</div></Link>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                ref = {inputRef}
                value={searchValue}
                placeholder="Search accounts and videos" 
                spellCheck={false} 
                onChange={handleChange}
                onFocus={() => setShowResults(true)}
                />
                {!!searchValue && !loading && (
                    <button 
                    className={cx('clear')} 
                    onClick={handleClearSearch}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon= {faSpinner} />}
            
                <Link to={`/search/user/${searchValue}`} state={searchValue} className={cx('search-btn')} onClick={handleHideSearch} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </Link>
            </div>
        </HeadlessTippy>
    </div>
    );
}

export default SearchInput;