import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GoalCreatePage from './pages/GoalCreatePage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/create-goal"
          element={
            <PrivateRoute>
              <GoalCreatePage />
            </PrivateRoute>
          }
        />
        {/* Placeholder for dashboard */}
        <Route path="/dashboard" element={<div className="p-8 text-center text-2xl">Dashboard coming soon...</div>} />
      </Routes>
    </Router>
  );
}

export default App;