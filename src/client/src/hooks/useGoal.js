import { useState } from 'react';
import apiClient from '../services/apiClient';

export const useGoal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const createGoal = async (title, description, milestones) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const res = await apiClient.post('/goals', {
                title,
                description,
                milestones,
            });
            setSuccess(res.data.message || 'Goal created successfully');
            return { success: true, data: res.data.goal };
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to create goal';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const getActiveGoal = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await apiClient.get('/goals/active');
            return { success: true, data: res.data };
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to fetch goal';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const updateMilestone = async (goalId, milestoneIndex) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const res = await apiClient.put(`/goals/${goalId}/milestone/${milestoneIndex}`);
            setSuccess('Milestone completed!');
            return { success: true, data: res.data };
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to update milestone';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const getCompletedGoals = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await apiClient.get('/goals/completed');
            return { success: true, data: res.data };
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to fetch completed goals';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    return {
        createGoal,
        getActiveGoal,
        updateMilestone,
        getCompletedGoals,
        loading,
        error,
        success,
        setError,
        setSuccess,
    };
};