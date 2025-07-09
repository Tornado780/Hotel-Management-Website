import React from 'react'
import { Link } from 'react-router-dom';
import {assets} from '../assets/assets'


import { useLocation, useNavigate } from 'react-router-dom';
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)
const Navbar = ({user}) => {
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

    React.useEffect(() => {

        setIsScrolled(location.pathname !== "/");


        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);


    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        });
        window.location.reload(); // or update user state to null
    };

    return (
        
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : " py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to='/'>
                    <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all` } onClick={() => navigate('/owner')}>
                       Dashboard
                    </button>
                </div>

                {/* Desktop Right */}
               <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                        <span className="text-sm">Hi, {user.name}</span>
                        <button onClick={handleLogout} className="text-sm hover:underline">
                            Logout
                        </button>
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
                        className={`${isScrolled ? "invert" : ""} h-4 cursor-pointer`}
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

                    <a
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition duration-500"
                    >
                        Login
                    </a>
                </div>

            </nav>
       
    );
}

export default Navbar
