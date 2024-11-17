import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      className="flex gap-2 uppercase text-xl font-bold py-2 px-2"
      to={'/'}>
      <span className="text-slate-300">Riddle</span>
      <span className="text-blue-500">Me</span>
    </Link>
  );
}
