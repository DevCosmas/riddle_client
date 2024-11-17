import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../constant/api';
import Cookies from 'js-cookie';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRegClock,
  FaEye,
} from 'react-icons/fa';
import RankingLeadershipComponent from './ranking';

export default function ViewChallengesComponent() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [openModal, setOpenModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [ranking, setRanking] = useState(null);

  function handleRankingModal(id) {
    setOpenModal(!openModal);
    if (!openModal) {
      viewOneChallenge(id);
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL.dev}/api/riddle/my_riddles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: itemsPerPage,
            },
          }
        );
        setChallenges(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [currentPage, itemsPerPage]);

  async function viewOneChallenge(id) {
    const token = Cookies.get('token');

    try {
      const response = await axios.get(
        `${API_BASE_URL.dev}/api/riddle/my_riddles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setCurrentChallenge(response.data);

      // Sort the answers directly from the fetched data
      const sortedAnswers = response.data.data.answers
        .sort((a, b) => a.timeCount - b.timeCount)
        .map((answer, index) => ({
          ...answer,
          rank: index + 1, // Assign rank based on the index
        }));

      // Set the ranking
      setRanking(sortedAnswers);

      console.log(sortedAnswers);
      
    } catch (error) {
      console.error('Error fetching challenge details:', error.response);
    }
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case 'ongoing':
        return (
          <span className="text-green-500 animate-pulse">
            <FaCheckCircle />
          </span>
        );
      case 'completed':
        return (
          <span className="text-red-500">
            <FaTimesCircle />
          </span>
        );
      case 'pending':
        return (
          <span className="text-yellow-500">
            <FaRegClock />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Active Challenges
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="text-gray-600">Loading challenges...</span>
        </div>
      ) : (
        <div>
          {/* Challenge Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {challenges.length === 0 ? (
              <p className="text-center text-gray-600">
                No challenges available
              </p>
            ) : (
              challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-transform transform hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {challenge.question}
                  </h3>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      {statusIcon(challenge.status)}
                      <span className="text-sm text-gray-600">
                        {challenge.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {challenge.duration.value} {challenge.duration.unit} left
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="text-blue-500 hover:text-blue-600 transition"
                      onClick={() => handleRankingModal(challenge._id)}>
                      <FaEye size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Prev
            </button>
            <span className="px-4 py-2 text-gray-800 font-semibold">
              {currentPage}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
      {openModal && (
        <RankingLeadershipComponent
          rankings={ranking}
          openModal={openModal}
          closeModal={handleRankingModal}
          challenge={currentChallenge} // Pass the current challenge details
        />
      )}
    </div>
  );
}
