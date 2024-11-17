import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

export default function CreateQuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [wager, setWager] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { publicKey, connected } = useWallet();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connected) {
      alert('Please connect your wallet first.');
      return;
    }

    const formData = {
      question,
      answer,
      options,
      wager: parseFloat(wager),
      walletAddress: publicKey.toBase58(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setIsModalOpen(true);
        // Reset form
        setQuestion('');
        setAnswer('');
        setOptions(['', '', '', '']);
        setWager('');
      } else {
        alert('Error creating question: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-opacity-10 bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">
          Create a Question
        </h2>

        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Question:
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 mb-4 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Answer:
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 mb-4 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Options:
        </label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full p-2 mb-2 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Wager Amount (SOL):
        </label>
        <input
          type="number"
          step="0.01"
          value={wager}
          onChange={(e) => setWager(e.target.value)}
          className="w-full p-2 mb-4 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Wallet Connection */}
        <div className="flex justify-center mb-4">
          <WalletMultiButton />
        </div>

        <input
          type="submit"
          value="Submit Question"
          className="w-full p-2 bg-gray-600 rounded-md text-gray-100 font-bold cursor-pointer hover:bg-gray-700 transition"
        />
      </form>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-64 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Question Created</h2>
            <p>Your question has been successfully submitted!</p>
            <button
              onClick={closeModal}
              className="mt-4 p-2 bg-blue-600 rounded-md text-gray-100 font-bold cursor-pointer hover:bg-blue-700 transition">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
