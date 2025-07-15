import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ user }) => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/' },
    { name: 'About', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isLightMode = isScrolled || !isHome;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isLightMode ? "bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4 text-gray-700" : "py-4 md:py-6 text-white"}`}>

      {/* Logo */}
      <Link to='/'>
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 ${isLightMode ? "invert opacity-80" : ""}`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${isLightMode ? "text-gray-700" : "text-white"}`}
          >
            {link.name}
            <div className={`${isLightMode ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </a>
        ))}
        {user?.role === "admin" ? (
          <a href="/owner" className={`text-sm font-medium ${isLightMode ? "text-gray-700" : "text-white"}`}>Dashboard</a>
        ) : (
          <a href="/my-bookings" className={`text-sm font-medium ${isLightMode ? "text-gray-700" : "text-white"}`}>My Bookings</a>
        )}
      </div>

      {/* Desktop Right */}
      <div className={`hidden md:flex items-center gap-4 ${isLightMode ? "text-gray-700" : "text-white"}`}>
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button onClick={handleLogout} className="text-sm hover:underline">Logout</button>
          </>
        ) : (
          <>
            <a href="/login" className="text-sm hover:underline">Login</a>
            <a href="/signup" className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">Sign Up</a>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt="Menu"
          className={`${isLightMode ? "invert" : ""} h-4 cursor-pointer`}
        />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="Close" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:underline transition"
          >
            {link.name}
          </a>
        ))}

        {user ? (
          <>
            <span className="text-base text-center">Hi, {user.name}</span>

            {user?.role === "admin" ? (
              <a
                href="/owner"
                onClick={() => setIsMenuOpen(false)}
                className="hover:underline transition"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/my-bookings"
                onClick={() => setIsMenuOpen(false)}
                className="hover:underline transition"
              >
                My Bookings
              </a>
            )}

            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-red-600 border border-red-600 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="hover:underline transition"
            >
              Login
            </a>
            <a
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="bg-black text-white px-8 py-2.5 rounded-full transition duration-500"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
