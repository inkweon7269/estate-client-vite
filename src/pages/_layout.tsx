import React from 'react';

import { NavLink } from 'react-router-dom';

const LayoutMain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/login'>로그인</NavLink>
                        </li>
                        <li>
                            <NavLink to='/join'>회원가입</NavLink>
                        </li>
                        <li>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to='/area'>Area</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default LayoutMain;
