import React, { createContext, useContext, useState } from 'react';
import Snackbar from '../components/Snackbar';

interface SnackbarContextType {
    showSnackbar: (message: string, type?: 'success' | 'error') => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');
    const [open, setOpen] = useState(false);

    const showSnackbar = (msg: string, variant: 'success' | 'error' = 'success') => {
        setMessage(msg);
        setType(variant);
        setOpen(true);
    };

    const closeSnackbar = () => setOpen(false);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {open && <Snackbar message={message} type={type} onClose={closeSnackbar} />}
        </SnackbarContext.Provider>
    );
};
