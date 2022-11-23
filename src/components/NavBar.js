import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";

function NavBar() {  
    const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

    const showHamburgerMenu = () => {
        const headerList = document.querySelector('.header__list');
        
        headerList.classList.add('active');
    };
    
    const hideHamburgerMenu = () => {
        const headerList = document.querySelector('.header__list');
        
        headerList.classList.remove('active');
    };

    return (
        <header className="header">
            <nav className="header__nav">
                <span className="header__hamburger" onClick={showHamburgerMenu}>
                    <svg width="36" height="21" viewBox="0 0 36 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="9" width="36" height="3" fill="#fff"/>
                        <rect x="6" y="18" width="30" height="3" fill="#fff"/>
                        <rect x="6" width="30" height="3" fill="#fff"/>
                    </svg>
                </span>
                
                <ul className="header__list">
                    <svg className="header__close" onClick={hideHamburgerMenu} viewBox="0 0 329.26933 329" >
                        <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" fill="#ffffff" data-original="#000000"/>
                    </svg>
                    <li className="header__item">
                        <FontAwesomeIcon icon={faHouse} className="header__icon" />
                        <Link className="header__link" onClick={hideHamburgerMenu} to="/">Homepage</Link>
                    </li>
                    {(user?.email) ? 
                        <>
                            <li className="header__item">
                                <FontAwesomeIcon icon={faList} className="header__icon" />
                                <Link className="header__link" onClick={hideHamburgerMenu} to="/info">Info</Link>
                            </li>
                            <li className="header__item">
                                <FontAwesomeIcon icon={faUser} className="header__icon" />
                                <Link className="header__link" onClick={hideHamburgerMenu} to="/logout">{user?.email}</Link>
                            </li>
                        </> 
                        :
                        <>
                            <li className="header__item">
                                <FontAwesomeIcon icon={faUser} className="header__icon" />
                                <Link className="header__link" onClick={hideHamburgerMenu} to="/login">Login</Link>
                            </li>
                            <li className="header__item">
                                <FontAwesomeIcon icon={faRightToBracket} className="header__icon" />
                                <Link className="header__link" onClick={hideHamburgerMenu} to="/register">Sign up</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
