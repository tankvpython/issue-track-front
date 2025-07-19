import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InviteAccept: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const acceptInvitation = async () => {
            try {
                const response = await axios.post('/api/invitations/accept/', { token });
                if (response.status === 200) {
                    setSuccess(true);
                }
            } catch (err) {
                setError('Failed to accept the invitation. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            acceptInvitation();
        } else {
            setError('Invalid invitation token.');
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {success ? (
                <h2>Invitation accepted! You can now access the issue board.</h2>
            ) : (
                <h2>Failed to accept the invitation.</h2>
            )}
        </div>
    );
};

export default InviteAccept;