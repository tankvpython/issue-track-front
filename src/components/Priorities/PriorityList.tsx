import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PriorityList: React.FC = () => {
    const [priorities, setPriorities] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await axios.get('/api/issues/priorities/');
                setPriorities(response.data);
            } catch (err) {
                setError('Failed to fetch priorities');
            } finally {
                setLoading(false);
            }
        };

        fetchPriorities();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Priority List</h2>
            <ul>
                {priorities.map(priority => (
                    <li key={priority.id}>
                        {priority.name} (Level: {priority.level})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PriorityList;