import React from 'react';

import { NavLink } from 'react-router-dom';

const LayoutUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/user/10'>User Detail</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default LayoutUser;
