import { Issue } from '../types';
import apiClient from './client';

export async function getIssue(id: string): Promise<Issue> {
    const response = await apiClient.get(`/issues/issues/${id}`);
    return response.data as Issue;
}

export async function createIssue(issueData: Partial<Issue>): Promise<Issue> {
    const response = await apiClient.post('/issues/issues/', issueData);
    return response.data as Issue;
}

export async function updateIssue(id: string, issueData: Partial<Issue>): Promise<Issue> {
    const response = await apiClient.put(`/issues/issues/${id}/`, issueData);
    return response.data as Issue;
}

export async function deleteIssue(id: number): Promise<void> {
    await apiClient.delete(`/issues/issues/${id}/`);
}




