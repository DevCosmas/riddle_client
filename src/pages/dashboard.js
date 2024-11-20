import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaUserCog, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    const isLogout = logout();
    if (isLogout) navigate('/login');
  }
  return (
    <div className="flex w-full min-h-screen relative gap-6 font-sans">
      {/* Side Bar */}
      <side className="w-full sm:h-screen sm:w-80 fixed pb-4 sm:top-0 bottom-0 h-20 z-50 sm:bottom-0 bg-gradient-to-r from-slate-900 to-blue-900 text-white ">
        <ul className="px-2 py-6 flex items-center justify-center sm:block ">
          <li className=" mx-auto mb-4">
            <Link
              to="/dashboard"
              className=" py-3 px-3 rounded-md hover:bg-blue-800 flex justify-center md:justify-start items-center">
              <FaHome className="text-2xl" />
              <span className="hidden md:inline ml-3">Home</span>
            </Link>
          </li>
          <li className=" mx-auto  mb-4">
            <Link
              to="/dashboard/create-challenge"
              className=" py-3 px-3 rounded-md hover:bg-blue-800 flex justify-center md:justify-start items-center">
              <GiBrain className="text-2xl" />
              <span className="hidden md:inline ml-3">Create Challenge</span>
            </Link>
          </li>
          <li className=" mx-auto mb-4">
            <Link
              to="/dashboard/view-challenges"
              className=" py-3 px-3 rounded-md hover:bg-blue-800 flex justify-center md:justify-start items-center">
              <FaEye className="text-2xl" />
              <span className="hidden md:inline ml-3">View Challenge</span>
            </Link>
          </li>
          <li className=" mx-auto mb-4 ">
            <Link
              to="/dashboard/update-user"
              className=" py-3 px-3 rounded-md hover:bg-blue-800 flex justify-center md:justify-start items-center">
              <FaUserCog className="text-2xl" />
              <span className="hidden md:inline ml-3">User Settings</span>
            </Link>
          </li>

          <li className=" mx-auto sm:px-3 sm:mt-11 ">
            <button
              onClick={handleLogout}
              className=" py-3 w-full rounded-md px-3 sm:hover:bg-red-800 text-red-600 sm:bg-red-600 flex justify-center md:justify-start items-center">
              <FaSignOutAlt className="text-2xl" />
              <span className="hidden md:inline ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </side>

      {/* Main content */}
      <main className="mx-auto px-6 py-4 w-full mb-16 sm:ml-80">
        <Outlet />
      </main>
    </div>
  );
}
