import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../store/blogReducer";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, loading } = useSelector((state) => state.blog);

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Reset form and navigate on successful blog creation
  useEffect(() => {
    if (successMessage) {
      // Reset form state
      setBlogData({ title: "", description: "", image: null });
      setCategories([]);
      setCategoryInput("");
      setFormErrors({});

      
      navigate("/");

    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const addCategory = () => {
    const trimmedCategory = categoryInput.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories([...categories, trimmedCategory]);
      setCategoryInput("");
    }
  };

  const removeCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Client-side validation
    if (!blogData.title) errors.title = "Title is required";
    if (!blogData.description) errors.description = "Description is required";
    if (!blogData.image) {
      errors.image = "Image is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(blogData.image.type)) {
        errors.image = "Only JPEG/PNG images allowed";
      }
    }
    if (categories.length === 0) errors.categories = "Add at least one category";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("image", blogData.image);
    categories.forEach((cat) => formData.append("categories", cat));

    // Dispatch createBlog action
    dispatch(createBlog(formData));
    setFormErrors({}); // Clear previous errors
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Blog title"
              disabled={loading}
              className={`p-3 border rounded-md ${
                formErrors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.title && (
              <p className="text-red-500 text-sm">{formErrors.title}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Featured Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              disabled={loading}
              className={`p-3 border rounded-md ${
                formErrors.image ? "border-red-500" : "border-gray-300"
              }`}
              accept="image/jpeg, image/png"
            />
            {formErrors.image && (
              <p className="text-red-500 text-sm">{formErrors.image}</p>
            )}
          </div>

          {/* Categories Input */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                placeholder="Add category"
                disabled={loading}
                className="p-3 border border-gray-300 rounded-md flex-grow"
              />
              <button
                type="button"
                onClick={addCategory}
                disabled={loading}
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            {formErrors.categories && (
              <p className="text-red-500 text-sm">{formErrors.categories}</p>
            )}
          </div>

          {/* Categories Display */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
              >
                <span>{category}</span>
                <MdCancel
                  className="ml-1 cursor-pointer hover:text-red-500"
                  onClick={() => !loading && removeCategory(category)}
                />
              </div>
            ))}
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Content</label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              placeholder="Write your blog content..."
              rows={8}
              disabled={loading}
              className={`p-3 border rounded-md ${
                formErrors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;