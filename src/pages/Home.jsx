import HomepageComp from "../components/HomepageComp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs,clearMessages } from "../store/blogReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogs = [] } = useSelector((state) => state.blog); // Ensure blogs is always an array


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id) => {

    
    navigate(`/blog/${id}`);

  };
 
  useEffect(() => {
    dispatch(fetchAllBlogs());
    dispatch(clearMessages());
  }, [dispatch]);

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <HomepageComp
            key={blog._id} 
            value={blog}
            onClick={() => handleClick(blog._id)}
          />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Home;
