import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/dashboard';
import CreateRiddleComponent from './component/create_riddle';
import ViewChallengesComponent from './component/view_challenges';
import DashboardHome from './component/home_dashboard';
import UpdatePage from './pages/update';
import ProtectedRoute from './pages/protected';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/signup"
            element={<SignUpPage />}
          />

          {/* Dashboard with nested routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
            <Route
              index
              element={<DashboardHome />}
            />
            <Route
              path="create-challenge"
              element={<CreateRiddleComponent />}
            />
            <Route
              path="view-challenges"
              element={<ViewChallengesComponent />}
            />
            <Route
              path="update-user"
              element={<UpdatePage />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
