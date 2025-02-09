import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog, deleteBlog } from "../store/blogReducer";

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Redirect after delete

  const { singleBlog, successMessage, errorMessage } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  // ✅ Ensure user & blog exist before checking ownership
  const checkAuth = user && singleBlog?.user && user.id === singleBlog.user._id;

  // ✅ Fetch Blog Data
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  // ✅ Handle Blog Delete
  const handleDelete = () => {
    dispatch(deleteBlog(id));
    navigate("/"); // Redirect to home after delete
  };

  return (
    <div className="m-5 p-3 flex flex-col justify-center items-center gap-10">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* ✅ Ensure singleBlog exists before rendering */}
      {singleBlog ? (
        <>
          {/* ✅ Show Edit/Delete Buttons Only for the Owner */}
          {checkAuth && (
            <div className="flex justify-between w-full max-w-2xl">
              <button className="text-white bg-black p-2 rounded-md" onClick={() => navigate(`/blog/edit/${id}`)}>Edit Blog</button>
              <button className="text-white bg-black p-2 rounded-md" onClick={handleDelete}>Delete Blog</button>
            </div>
          )}

          {/* ✅ Blog Content */}
          <h1 className="text-3xl font-bold">{singleBlog.title}</h1>
          <img src={singleBlog.image} alt="Blog Cover" className="max-w-full rounded-lg shadow-md" />

          {/* ✅ Display Author Name */}
          {singleBlog.user && (
            <div className="flex justify-start items-start gap-3">
              <label htmlFor="author" className="font-bold">Author:</label> 
              <p className="text-gray-700 text-lg">{singleBlog.user.username}</p>
            </div>
          )}

          {/* ✅ Display Categories */}
          <div className="flex flex-wrap gap-2">
            {singleBlog.category?.map((cat, index) => (
              <span key={index} className="bg-slate-600 text-white p-2 rounded-md">{cat}</span>
            ))}
          </div>

          {/* ✅ Blog Description */}
          <p className="text-gray-700 text-lg">{singleBlog.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogPage;
