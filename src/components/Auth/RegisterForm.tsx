import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useSnackbar } from '../../context/SnackbarContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const { register } = useAuth();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await register(username, email, password);
            showSnackbar('Registration successful! Please log in.','success');
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (err) {
            showSnackbar('Registration failed. Please try again.', 'error');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Register for Issue Tracker</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <p className="login-error">{error}</p>}
                    {success && <p className="login-success">{success}</p>}

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
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

                    <button type="submit" className="login-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;