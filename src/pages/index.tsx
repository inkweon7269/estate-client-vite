import { NavLink } from 'react-router-dom';

const Index = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/' end>
                        Index
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/home' end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about' end>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about/10'>About Detail</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Index;
