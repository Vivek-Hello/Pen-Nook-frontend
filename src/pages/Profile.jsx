import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../store/authReducer.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoading, successMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (successMessage) {
      navigate('/');
    }
  }, [successMessage, navigate]);

  // Handle case when user data isn't loaded yet
  if (!user) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg border rounded-lg w-64">
      <h1 className="mb-4 font-mono text-2xl font-semibold text-gray-800">
        Profile
      </h1>

      {/* Profile Picture */}
      <div className="mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img 
            src={user.image } 
            alt={user.username}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* User Information */}
      <div className="w-full space-y-2">
        <div className="flex justify-center">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-600">{user.username}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600 break-all">{user.email}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 w-full">
        <button onClick={()=>{navigate('/edituser')}}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1"
        >
          Edit
        </button>
        <button 
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 flex-1 disabled:opacity-50"
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default Profile;