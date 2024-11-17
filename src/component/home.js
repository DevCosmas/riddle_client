import Logo from './logo';
import { Link } from 'react-router-dom';

export default function HomeComponent() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6">
        <Logo />
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-center text-slate-200 px-6 sm:px-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-500">Riddle Me</span> Platform!
        </h1>
        <p className="text-lg sm:text-xl font-light leading-relaxed">
          Engage your followers on <span className="font-semibold">X</span> with
          an exciting riddle challenge.
          <br />
          <span className="font-medium text-blue-300">
            It’s all about speed and precision here!
          </span>
          <br />
          Have fun and let the games begin. 🎉
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="flex justify-center pb-8">
        <Link
          to={'/login'}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition">
          Get Started
        </Link>
      </div>
    </div>
  );
}
