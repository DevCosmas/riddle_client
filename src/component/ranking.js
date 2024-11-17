import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const LeadershipRanking = ({ rankings, openModal, closeModal }) => {
  console.log(rankings.length);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedUser(null);
    setShowDetailsModal(false);
  };

  return (
    <div>
      {/* Leadership Ranking Modal */}

      {rankings.length === 0 && <div>No answers yet</div>}
      {openModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 shadow-xl rounded-xl w-4/5 max-h-[90vh] overflow-y-auto relative p-6">
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl">
              &times;
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Leadership Ranking
            </h2>
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">
                      Rank
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">
                      Wallet Address
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-300">
                      Time
                    </th>
                    <th className="py-3 px-4 text-center font-semibold text-gray-300">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-700 hover:bg-gray-700 transition">
                      <td className="py-3 px-4 text-gray-300">{user.rank}</td>
                      <td className="py-3 px-4 text-gray-300">
                        {user.walletAddress}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {user.timeCount} s
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => openDetailsModal(user)}
                          className="text-blue-400 hover:text-blue-500 transition">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Ranking Details Modal */}
      {showDetailsModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true">
          <div className="bg-gradient-to-br from-blue-900 to-black shadow-xl rounded-xl max-w-lg w-full p-8 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={closeDetailsModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl">
              &times;
            </button>
            <h3
              id="modal-title"
              className="text-2xl font-bold text-white text-center mb-6">
              Ranking Details
            </h3>
            <div className="text-gray-300 space-y-4">
              <p>
                <span className="font-bold text-blue-400">Rank:</span>{' '}
                {selectedUser.rank}
              </p>
              <p>
                <span className="font-bold text-blue-400">Wallet:</span>{' '}
                {selectedUser.walletAddress}
              </p>
              <p>
                <span className="font-bold text-blue-400">Time Spent:</span>{' '}
                {selectedUser.timeCount} s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipRanking;
