import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // from context
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-title">
                    <Link to="/">Mini Issue Tracker</Link>
                </h1>
            </div>

            <div className="header-right">
                {isAuthenticated && user ? (
                    <>
                        <span className="header-user">👤 {user.username || user.email}</span>
                        <button className="header-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        className="header-btn"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
