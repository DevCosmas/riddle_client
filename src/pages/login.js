import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../component/logo';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  // Ensure that 'login' is properly retrieved from 'useAuth'
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Handle the login process
  async function handleLogin(e) {
    e.preventDefault();

    try {
      // Call login function from context
      const isLoggedIn = await login(email, password);

      if (!isLoggedIn) throw new Error('Login was not successful');

      // Redirect to dashboard if login is successful
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message); // Log error message to the console
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
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

        {/* Login Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleLogin}>
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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
