import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Profile from "../pages/Profile";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector((state)=>state.auth); 
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false); // State for dropdown visibility

  const handleClick = (to) => {
    navigate(to);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      {/* Logo */}
      <div className="text-lg md:text-xl font-mono">
        <Link to="/">
          <h1 className="font-bold text-3xl">PenNook</h1>
        </Link>
      </div>

      {/* Search Bar
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-slate-200 p-2 rounded-l-lg outline-none"
          aria-label="Search"
        />
        <button
          className="bg-slate-200 p-3 rounded-r-lg"
          aria-label="Search Button"
        >
          <FaSearch />
        </button>
      </div> */}

      {/* User Options */}
      <div className="relative flex items-center">
        {user ? (
          <div className="text-sm md:text-lg font-mono flex gap-4">
            <Link to="/write" className="hover:underline">
              Write
            </Link>
            <div
              className="relative"
             onMouseEnter ={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              <span className="cursor-pointer hover:underline">Profile</span>
              {showProfile && (
                <div className="absolute top-8 right-0 bg-white shadow-lg border rounded-md z-10">
                  <Profile />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="m-2 bg-black text-white p-2 rounded-lg hover:bg-gray-800"
              onClick={() => handleClick("/register")}
            >
              Register
            </button>
            <button
              className="m-2 bg-black text-white p-2 rounded-lg hover:bg-gray-800"
              onClick={() => handleClick("/login")}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
