import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const { login, setLoading,loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <>
        {loading && <Loader />}
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Login to Issue Tracker</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <p className="login-error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="action-btn edit" onClick={() => navigate(`/register`)}>Sign Up</button>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default LoginForm;