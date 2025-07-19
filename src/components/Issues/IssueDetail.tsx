import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/client';

const IssueDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [issue, setIssue] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await apiClient.get(`/api/issues/${id}/`);
                setIssue(response.data);
            } catch (err) {
                setError('Failed to fetch issue details');
            } finally {
                setLoading(false);
            }
        };

        fetchIssue();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <p>Priority: {issue.priority.name}</p>
            <p>Assigned to: {issue.assigned_to.username}</p>
            <h3>Tags</h3>
            <ul>
                {issue.tags.map((tag: any) => (
                    <li key={tag.id}>{tag.name}</li>
                ))}
            </ul>
            <h3>Logs</h3>
            <ul>
                {issue.issue_logs.map((log: any) => (
                    <li key={log.id}>
                        {log.timestamp}: {log.action} by {log.performed_by.username} - {log.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IssueDetail;