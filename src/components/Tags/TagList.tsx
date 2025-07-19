import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tag } from '../../types';


const TagList: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('/api/issues/tags/');
                setTags(response.data);
            } catch (err) {
                setError('Failed to fetch tags');
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/issues/tags/${id}/`);
            setTags(tags.filter(tag => tag.id !== id));
        } catch (err) {
            setError('Failed to delete tag');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Tags</h2>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>
                        {tag.name}
                        <button onClick={() => handleDelete(tag.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagList;