import React, { useEffect } from 'react';

interface SnackbarProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Auto-close after 3s
        return () => clearTimeout(timer);
    }, [onClose]);
    console.log(`Snackbar shown: ${message} (${type})`);

    return (
        <div className={`snackbar ${type}`}>
            {message}
        </div>
    );
};

export default Snackbar;
