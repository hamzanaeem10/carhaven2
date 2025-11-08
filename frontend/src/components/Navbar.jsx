import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header className="bg-slate-900/60 border-b border-slate-800">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          <span className="text-brand">Car</span>Haven
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className="hover:text-brand">Home</NavLink>
          <NavLink to="/listings" className="hover:text-brand">Listings</NavLink>
          <NavLink to="/about" className="hover:text-brand">About</NavLink>
          <NavLink to="/contact" className="hover:text-brand">Contact</NavLink>
          {token ? (
            <>
              <NavLink to="/admin" className="btn">Admin</NavLink>
              <button onClick={logout} className="ml-2 text-sm underline">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn">Login</NavLink>
              <NavLink to="/register" className="ml-2 underline">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
