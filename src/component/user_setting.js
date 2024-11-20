import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import Notify from './notify';

export default function UpdateUser() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const { isLoading, updateUser } = useAuth();
  const token = Cookies.get('token');

  async function handleUserUpdate(e) {
    e.preventDefault();
    await updateUser(token, username, email);
  }

  return (
    <div className="flex flex-col justify-center items-center px-3 py-2 my-8">
      <form
        onSubmit={(e) => handleUserUpdate(e)}
        className="flex flex-col my-6 w-full sm:w-1/2  mx-auto bg-white rounded-md shadow-md py-2 px-2">
        <h1 className="uppercase font-sans text-center font-bold">
          Update user details
        </h1>
        <span className="flex flex-col gap-2 ">
          <label>Username</label>
          <input
            className="border-b rounded-md focus-visible:ring-blue-400 px-2 py-2 outline-none"
            type="text"
            name="name"
            placeholder="enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
        <br />
        <span className="flex flex-col gap-2 ">
          <label>Email</label>
          <input
            className="border-b rounded-md focus-visible:ring-blue-400 px-2 py-2 outline-none"
            type="email"
            name="email"
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <br />

        {/* Submit Button */}
        <button
          type="submit"
          className={`flex capitalize hover:bg-blue-800 justify-center items-center px-2 py-2 rounded-full sm:w-1/2 w-4/5 mx-auto text-slate-50 ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600'
          }`}>
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
      <Notify />
    </div>
  );
}
