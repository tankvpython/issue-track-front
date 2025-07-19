import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createIssue, deleteIssue } from '../../api/issues';
import { updateIssue, getIssue } from '../../api/issues'; // Assuming these API functions are defined
import { Issue, Priority, Tag, User } from '../../types'; // Assuming you have a types file for TypeScript types
import axios from 'axios';
import fetchPriorities from '../../api/client';
import { useSnackbar } from '../../context/SnackbarContext';


const IssueForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'OPEN' | 'IN_PROGRESS' | 'CLOSED'>();
    const [listOfPriorities, setListOfPriorities] = useState<Priority[]>([]);
    const [priority, setPriority] = useState<Priority>();
    const [priorityId, setPriorityId] = useState<number>();
    const [tags, setTags] = useState<Tag[]>([]);
    const [assignedTo, setAssignedTo] = useState<User>();

   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const statusValue = status?.toLowerCase();
        const validStatus: Issue['status'] = 
          statusValue === 'OPEN' || statusValue === 'IN_PROGRESS' || statusValue === 'CLOSED'
            ? statusValue
            : 'OPEN'; // fallback or handle error

        const issueData: Partial<Issue> = { title, description, status: validStatus, priority:priorityId, tags, assigned_to: assignedTo };
        if (id) {
            await updateIssue(id, issueData);
            showSnackbar('Issue Updated!', 'success');
        } else {
            await createIssue(issueData);
            showSnackbar('Issue Created!', 'success');
        }
        navigate('/dashboard'); // Redirect to the issue list after submission
    };


     const getPriorities = async () => {
        try {
            const response = await fetchPriorities('/issues/priorities/')
            console.log('Fetched priorities:', response.data);  
            setListOfPriorities(response.data);
        } catch (err) {
            console.log('Failed to fetch priorities', err);
        } finally {
        }
    };


    useEffect(() => {
        if (id) {
            getIssue(id).then(data => {
                setIssue(data);
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
                if (data.priority) {
                    setPriorityId(data.priority);
                }
                setTags(data.tags);
                if (data.assigned_to) {
                setAssignedTo(data.assigned_to);
                }
            });
        }
    }, [id]);

    useEffect(() => {
        getPriorities()
    },[]);


    return (
        <div className="login-wrapper">
        <div className="login-container">
            <h2>{id ? 'Update Issue' : 'Create New Issue'}</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'OPEN' | 'IN_PROGRESS' | 'CLOSED')}
                    >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="CLOSED">Closed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        value={priority?.id}
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value);
                            const selectedPriority = listOfPriorities.find(p => p.id === selectedId);
                            setPriority(selectedPriority); // ✅ sets the full object
                            setPriorityId(selectedId); // ✅ sets the ID for future use
                        }}
                        required
                    >
                        <option value="" disabled>Select priority</option>
                        {listOfPriorities.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                        ))}
                    </select>
                    </div>


                <div className="form-group">
                    <label htmlFor="assignedTo">Assigned To (User ID):</label>
                    <input
                        type="text"
                        id="assignedTo"
                        value={assignedTo?.id ?? ''}
                        onChange={(e) => setAssignedTo({ id: Number(e.target.value) } as User)}
                    />
                </div>

                <button type="submit" className="login-btn">
                    {id ? 'Update Issue' : 'Create Issue'}
                </button>
            </form>
        </div>
    </div>
    );
};

export default IssueForm;