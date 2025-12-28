import { useState } from 'react';
import apiClient from '../services/apiClient';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const register = async (name, username, password) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const res = await apiClient.post('/auth/register', { name, username, password });
            setSuccess(res.data.message);
            return { success: true, data: res.data };
        } catch (err) {
            const msg = err.response?.data?.error || 'Registration failed';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const res = await apiClient.post('/auth/login', { username, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            setSuccess(`Welcome, ${user.name}!`);
            return { success: true, data: res.data };
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setSuccess('Logged out successfully');
    };

    const isAuthenticated = () => !!localStorage.getItem('token');

    return {
        register,
        login,
        logout,
        isAuthenticated,
        loading,
        error,
        success,
        setError, // to clear error manually if needed
        setSuccess,
    };
};