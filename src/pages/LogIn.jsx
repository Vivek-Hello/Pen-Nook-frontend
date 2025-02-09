  import { useState, useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { logInUser } from "../store/authReducer.js";

  const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, errorMessage } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      dispatch(logInUser(formData)); // Send as regular object instead of FormData
    };

    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]); // Added dependencies

  

    return (
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg p-6 rounded-lg bg-white w-full max-w-md">
          <h1 className="text-2xl font-mono font-bold text-center mb-4">
            Login Page
          </h1>
          
          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
                minLength="6"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default LogIn;