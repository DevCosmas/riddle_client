import { useState } from 'react';
import Logo from '../component/logo';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const { signup } = useAuth();

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const isSignUp = await signup(username, email, password, confirmPassword);
      if (!isSignUp) throw new Error('sign up was not successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-blue-900 flex flex-col justify-center items-center">
      {/* Logo Section */}
      <div className="absolute top-5 left-5">
        <Logo />
      </div>

      {/* Form Section */}
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-slate-800 p-8 rounded-lg shadow-lg text-slate-200">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign Up</h2>

        {/* Sign-Up Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => handleSignUp(e)}>
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-slate-400">
              Username
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="mt-1 block w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-400">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
