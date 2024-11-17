// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import {
//   FaEye,
//   FaUserCog,
//   FaSignOutAlt,
//   FaHome,
//   FaBars,
//   FaTimes,
// } from 'react-icons/fa';
// import { GiBrain } from 'react-icons/gi';

// const Dashboard = () => {
//   const { logout } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen">
//       {/* Mobile Hamburger Menu */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-20 bg-blue-900 text-white p-3 rounded-full"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         aria-label="Toggle Sidebar">
//         {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`bg-gradient-to-r from-slate-900 to-blue-900 text-white w-16 md:w-64 p-4 fixed inset-y-0 top-0 left-0 z-10 overflow-y-auto transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 md:translate-x-0`}>
//         <div className="text-center font-bold text-xl mb-6 hidden md:block">
//           <h2>Dashboard</h2>
//         </div>
//         <ul className="flex flex-col justify-between items-center md:items-start h-full">
//           <li className="mb-4">
//             <Link
//               to="/dashboard"
//               className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
//               onClick={() => setIsSidebarOpen(false)}>
//               <FaHome className="text-2xl" />
//               <span className="hidden md:inline ml-3">Home</span>
//             </Link>
//           </li>

//           <li className="mb-4">
//             <Link
//               to="/dashboard/create-challenge"
//               className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
//               onClick={() => setIsSidebarOpen(false)}>
//               <GiBrain className="text-2xl" />
//               <span className="hidden md:inline ml-3">
//                 Create Riddle Challenge
//               </span>
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link
//               to="/dashboard/view-challenges"
//               className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
//               onClick={() => setIsSidebarOpen(false)}>
//               <FaEye className="text-2xl" />
//               <span className="hidden md:inline ml-3">
//                 View Riddle Challenges
//               </span>
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link
//               to="/settings"
//               className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
//               onClick={() => setIsSidebarOpen(false)}>
//               <FaUserCog className="text-2xl" />
//               <span className="hidden md:inline ml-3">User Settings</span>
//             </Link>
//           </li>
//           <li className="mb-4">
//             <button
//               onClick={logout}
//               className="w-full py-3 px-3 bg-red-600 hover:bg-red-700 text-white flex justify-center md:justify-start items-center">
//               <FaSignOutAlt className="text-2xl" />
//               <span className="hidden md:inline ml-3">Logout</span>
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 ml-16 md:ml-64 p-6 bg-gray-100">
//         <div>
//           {/* Render Nested Routes */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaEye,
  FaUserCog,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';

const Dashboard = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-blue-900 text-white p-3 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar">
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gradient-to-r from-slate-900 to-blue-900 text-white w-16 md:w-64 p-4 fixed inset-y-0 top-0 left-0 z-10 overflow-y-auto transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0`}>
        <div className="text-center font-bold text-xl mb-6 hidden md:block">
          <h2>Dashboard</h2>
        </div>
        <ul className="flex flex-col gap-0 justify-between items-center md:items-start h-full">
          <li className="">
            <Link
              to="/dashboard"
              className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
              onClick={() => setIsSidebarOpen(false)}>
              <FaHome className="text-2xl" />
              <span className="hidden md:inline ml-3">Home</span>
            </Link>
          </li>

          <li className="">
            <Link
              to="/dashboard/create-challenge"
              className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
              onClick={() => setIsSidebarOpen(false)}>
              <GiBrain className="text-2xl" />
              <span className="hidden md:inline ml-3">
                Create Riddle Challenge
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              to="/dashboard/view-challenges"
              className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
              onClick={() => setIsSidebarOpen(false)}>
              <FaEye className="text-2xl" />
              <span className="hidden md:inline ml-3">
                View Riddle Challenges
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              to="/settings"
              className="block py-3 px-3 hover:bg-blue-800 flex justify-center md:justify-start items-center"
              onClick={() => setIsSidebarOpen(false)}>
              <FaUserCog className="text-2xl" />
              <span className="hidden md:inline ml-3">User Settings</span>
            </Link>
          </li>
          <li className="">
            <button
              onClick={logout}
              className="w-full py-3 px-3 bg-red-600 hover:bg-red-700 text-white flex justify-center md:justify-start items-center">
              <FaSignOutAlt className="text-2xl" />
              <span className="hidden md:inline ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-16 md:ml-64 p-6 bg-gray-100">
        <div>
          {/* Render Nested Routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
