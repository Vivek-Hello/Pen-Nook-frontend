import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleBlog, updateBlog, clearMessages } from "../store/blogReducer"; 
import { MdCancel } from "react-icons/md";

const EditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { singleBlog, isLoading, errorMessage, successMessage } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [categories, setCategories] = useState([]); 
  const [categoryInput, setCategoryInput] = useState("");

  // ✅ Fetch blog details
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
    dispatch(clearMessages()); // Clear messages when page loads
  }, [dispatch, id]);

  // ✅ Set form state when blog is fetched
  useEffect(() => {
    if (singleBlog) {
      setFormData({
        title: singleBlog.title || "",
        description: singleBlog.description || "",
        image: singleBlog.image || null,
      });
      setCategories(singleBlog.category || []);
    }
  }, [singleBlog]);

  // ✅ Redirect to Home when the update is successful
  useEffect(() => {
    if (successMessage) {
      navigate("/"); // Redirect to Home
    }
  }, [successMessage, navigate]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // ✅ Add Category
  const addCategory = () => {
    if (categoryInput.trim() !== "" && !categories.includes(categoryInput)) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  // ✅ Remove Category
  const removeCategory = (val) => {
    setCategories(categories.filter((cat) => cat !== val));
  };

  // ✅ Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("description", formData.description);
    updatedFormData.append("category", categories.join(",")); // Convert array to string
    if (formData.image) updatedFormData.append("image", formData.image);

    dispatch(updateBlog({ id, formData: updatedFormData }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-lg bg-white rounded-lg w-full max-w-4xl p-6 md:p-8">
        {isLoading && <p className="text-center text-blue-500">Loading...</p>}
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-mono mb-6 text-center">Edit Blog</h1>

          {/* ✅ Title Input */}
          <div className="flex flex-col mb-6">
            <label htmlFor="title" className="mb-2 font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the Title"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* ✅ Image Upload */}
          <div className="flex flex-col mb-6">
            <label htmlFor="image" className="mb-2 font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* ✅ Categories Input */}
          <div className="flex flex-col md:flex-row items-center mb-6">
            <input
              type="text"
              placeholder="Add a category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="flex-grow p-3 border rounded-md md:rounded-l-md md:rounded-r-none focus:outline-none"
            />
            <button
              type="button"
              className="w-full md:w-auto mt-2 md:mt-0 bg-black text-white py-3 px-4 rounded-md md:rounded-r-md md:rounded-l-none hover:bg-gray-700 focus:outline-none"
              onClick={addCategory}
            >
              Add
            </button>
          </div>

          {/* ✅ Display Categories */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                <span>{cat}</span>
                <MdCancel
                  className="ml-2 text-gray-600 cursor-pointer hover:text-red-500"
                  onClick={() => removeCategory(cat)}
                />
              </div>
            ))}
          </div>

          {/* ✅ Description */}
          <div className="flex flex-col mb-6">
            <label htmlFor="description" className="mb-2 font-medium">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your blog description here..."
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              rows={6}
            ></textarea>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
