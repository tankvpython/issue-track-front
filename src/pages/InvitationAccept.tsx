import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const InvitationAccept: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    // const { acceptInvitation } = useAuth();

    // useEffect(() => {
    //     if (token) {
    //         acceptInvitation(token);
    //     }
    // }, [token, acceptInvitation]);

    return (
        <div>
            <h1>Accept Invitation</h1>
            <p>If you have successfully accepted the invitation, you will be redirected shortly.</p>
        </div>
    );
};

export default InvitationAccept;