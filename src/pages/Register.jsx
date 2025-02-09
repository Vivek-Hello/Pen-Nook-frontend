import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, clearMessages } from "../store/authReducer"; // Import clearMessages

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, successMessage, errorMessage } = useSelector((state) => state.auth);
  

  // Corrected function name spellingnpm run 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
  
    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
  
    dispatch(registerUser(formDataToSend));
  };

  useEffect(() => {
    if (successMessage) {
      navigate('/');
    }
    
    // Cleanup: clear messages when unmounting
    return () => {
      dispatch(clearMessages());
    };
  }, [successMessage, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg p-6 rounded-lg bg-white w-full max-w-md">
        <h1 className="text-2xl font-mono font-bold text-center mb-4">
          Register Page
        </h1>
        
        {/* Status Messages */}
        {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
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
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
              minLength="6"
            />
          </div>

          {/* Profile Image Input */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*" // Corrected accept attribute
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            {formData.image && (
              <p className="text-sm mt-1 text-gray-600">
                Selected file: {formData.image.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;