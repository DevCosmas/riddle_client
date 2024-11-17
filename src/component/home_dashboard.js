import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardHome() {
  const { user } = useAuth();
  return (
    <div>
      {' '}
      {/* Header */}
      <div className=" flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">
          Welcome, {user ? user.username : 'Guest'}!
        </h1>
      </div>
      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Riddle Challenges Actions */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Manage Riddle Challenges
          </h2>
          <div className="mt-4">
            <p className="text-gray-700">
              Create, view, and manage your riddle challenges here.
            </p>
            <div className="flex justify-between mt-6">
              <Link
                to="/dashboard/create-challenge"
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Create Riddle
              </Link>
              <Link
                to="/dashboard/view-challenges"
                className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                View Riddles
              </Link>
            </div>
          </div>
        </div>

        {/* User Settings */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">User Settings</h2>
          <div className="mt-4 flex  flex-col items-start  justify-between">
            <p className="text-gray-700">Adjust your profile settings here.</p>
            <Link
              to="/settings"
              className="mt-6 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Manage Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
