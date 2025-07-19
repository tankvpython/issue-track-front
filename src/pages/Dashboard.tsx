import React from 'react';
import useAuth from '../hooks/useAuth';
import IssueList from '../components/Issues/IssueList';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <IssueList />
        </div>
    );
};

export default Dashboard;