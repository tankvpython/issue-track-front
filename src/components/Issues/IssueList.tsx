import React, { useEffect, useState } from 'react';
import fetchIssues from '../../api/client';
import { Issue } from '../../types';
import { useNavigate } from 'react-router-dom';
import { deleteIssue } from '../../api/issues';
import { useSnackbar } from '../../context/SnackbarContext';

const IssueList: React.FC = () => {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getIssues = async () => {
        try {
            const response = await fetchIssues('/issues/issues/');
            setIssues(response.data);
        } catch (err) {
            setError('Failed to fetch issues');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id:number) => {
        try {
            await deleteIssue(id);
            showSnackbar('Issue deleted!', 'success');
            // Optionally refetch list or remove issue from local state
        } catch (err) {
            showSnackbar('Error deleting issue.', 'error');
        }
    };

    useEffect(() => {
        getIssues();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
       <div className="container">
            <div className="command-bar">
                <button className="command-btn" onClick={() => navigate('/issues/new')}>
                    + Create New Issue
                </button>
            </div>
            <h2>Issue List</h2>
            <table className="issue-table">
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.length > 0 ? issues.map(issue => (
                        <tr key={issue.id}>
                            <td>{issue.id}</td>
                            <td>{issue.title}</td>
                            <td>{issue.description}</td>
                            <td>
                                <span className={`status ${issue.status.toLowerCase().replace(' ', '-')}`}>
                                    {issue.status}
                                </span>
                            </td>
                            <td className="priority">{issue.priority_name}</td>
                            <td className="assignee">👤 {issue.assigned_name}</td>
                            <td>
                                <button className="action-btn edit" onClick={() => navigate(`/issues/${issue.id}/edit`)}>Edit</button>
                                <button className="action-btn delete" onClick={() =>handleDelete(issue.id)}> Delete</button>
                            </td>
                        </tr>
                    )) : 
                    <tr >
                        <td colSpan={7} className="no-issues text-center">
                            { 'No issues found'}
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default IssueList;
