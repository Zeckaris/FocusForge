import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGoal } from '../hooks/useGoal';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, login, loading: authLoading, error: authError, success: authSuccess } = useAuth();
  const { getActiveGoal, loading: goalLoading } = useGoal();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      await register(name, username, password);
    } else {
      const loginResult = await login(username, password);
      if (loginResult.success) {
        // Check if user has an active goal
        const goalResult = await getActiveGoal();
        if (goalResult.success && goalResult.data) {
          navigate('/dashboard');
        } else {
          navigate('/create-goal');
        }
      }
    }

    // Clear fields
    setPassword('');
    setUsername('');
    if (isRegister) setName('');
  };

  const loading = authLoading || goalLoading;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-4xl font-bold mb-8 text-primary">
            FocusForge
          </h1>

          <h2 className="text-center text-2xl mb-8">
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="yourusername"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary w-full mb-4"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : isRegister ? (
                'Register'
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="link link-hover text-sm"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </button>
          </div>

          {authSuccess && (
            <div className="alert alert-success mt-6">
              <span>{authSuccess}</span>
            </div>
          )}

          {authError && (
            <div className="alert alert-error mt-6">
              <span>{authError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;