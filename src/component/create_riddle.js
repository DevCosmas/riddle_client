import React, { useState } from 'react';
import API_BASE_URL from '../constant/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoCopy } from 'react-icons/io5';
import { handleServerError } from '../utils/server.error';

export default function CreateRiddleComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blink, setBlink] = useState('');
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    description: '',
    wager: '',
    options: ['', '', '', ''], // Options as an array of strings
    duration: { value: '', unit: 'minutes' }, // Duration as an object
    icon: null, // File for the icon
  });

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value; // Update the specific option by index
    setFormData((prevState) => ({
      ...prevState,
      options: updatedOptions,
    }));
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      duration: {
        ...prevState.duration,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      icon: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('question', formData.question);
    formDataToSend.append('answer', formData.answer);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('wager', formData.wager);
    formDataToSend.append('duration', JSON.stringify(formData.duration));

    formData.options.forEach((option) => {
      formDataToSend.append('options[]', option);
    });

    // Append the file
    if (formData.icon) {
      formDataToSend.append('icon', formData.icon);
    } else {
      console.log('No file selected for icon');
    }

    // Get the auth token from cookies
    const token = Cookies.get('token');

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_BASE_URL.prod}/api/riddle/action/create`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response) throw new Error('request could not be processed');
      setIsLoading(false);
      setOpenModal(true);
      setBlink(response.data.data.blink);
      console.log('Response:', response);
      setFormData({
        question: '',
        answer: '',
        description: '',
        wager: '',
        options: ['', '', '', ''],
        duration: { value: '', unit: 'minutes' },
        icon: null,
      });
    } catch (error) {
      setIsLoading(false);
      // console.error('Error:', error);
      handleServerError(error.response?.status, error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create Riddle Challenge</h2>
      <form onSubmit={handleSubmit}>
        {/* Question */}
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
            placeholder="i disobey the law of gravity , who am i ?"
          />
        </div>

        {/* Answer */}
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-gray-700">
            Answer
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
            placeholder="age"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
            placeholder=" e.g Answer this simple challenge an win a rewarding prize of 1 SOl"
          />
        </div>

        {/* Wager */}
        <div className="mb-4">
          <label
            htmlFor="wager"
            className="block text-gray-700">
            Wager
          </label>
          <input
            type="number"
            id="wager"
            name="wager"
            value={formData.wager}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
            placeholder="100, amount to be rewarded in sol"
          />
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="block text-gray-700">Options</label>
          <div className="space-y-4">
            {formData.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-4">
                <label
                  htmlFor={`option_${index}`}
                  className="w-12 text-gray-700 font-semibold">
                  {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                </label>
                <input
                  type="text"
                  id={`option_${index}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  placeholder="answer options"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700">
            Duration
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              name="value"
              value={formData.duration.value}
              onChange={handleDurationChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="how long will the challenge last"
              required
            />
            <select
              name="unit"
              value={formData.duration.unit}
              onChange={handleDurationChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg">
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>
        </div>

        {/* Icon */}
        <div className="mb-4">
          <label
            htmlFor="icon"
            className="block text-gray-700">
            Icon (Image)
          </label>
          <input
            type="file"
            id="icon"
            name="icon"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            accept="image/*"
            required
          />
        </div>

        {/* Submit */}
        <div className="mb-4">
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full">
            {isLoading ? 'Creating...' : 'Create Riddle'}
          </button>
        </div>
      </form>
      {openModal && (
        <Modal
          blink={blink}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function Modal({ blink, onClose }) {
  const [isCopied, setIsCopied] = useState({
    status: false,
    text: '',
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blink).then(() => {
      setIsCopied({
        status: true,
        text: 'Copied Blink',
      });
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center px-2 py -2 items-center bg-gray-800 bg-opacity-50">
      <div className="w-full sm:w-4/5 md:w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold font-serif text-gray-800 mb-4 text-center">
          Challenge Successfully Created!
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Copy the blink URL and share it on <b>X</b> to engage your users in an
          interesting social game.
        </p>
        <div className="flex items-center justify-between gap-4 border p-3 rounded-lg bg-gray-100">
          <p className="text-sm text-gray-700 truncate">{blink}</p>
          <button
            onClick={copyToClipboard}
            className="flex items-center text-blue-600 hover:text-blue-800">
            <IoCopy size={20} />
          </button>
        </div>
        {isCopied.status && (
          <p className="text-blue-600 italic">{isCopied.text}</p>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
