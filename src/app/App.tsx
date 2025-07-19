import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Routes from './routes';
import Header from '../components/Header';
import { SnackbarProvider } from '../context/SnackbarContext';
import RouteChangeLoader from '../components/RouteChangeLoader';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <SnackbarProvider>
                    <Header />
                    <RouteChangeLoader />
                    <Routes />
                </SnackbarProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;