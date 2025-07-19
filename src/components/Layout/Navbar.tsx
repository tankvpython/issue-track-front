import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <div className="logo">
                <Link to="/">Mini Issue Tracker</Link>
            </div>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/issues">Issues</Link>
                </li>
                <li>
                    <Link to="/tags">Tags</Link>
                </li>
                <li>
                    <Link to="/priorities">Priorities</Link>
                </li>
                <li>
                    <Link to="/invitations">Invitations</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;