import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig.js";

// 📌 1️⃣ Create a Blog
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (formData, { rejectWithValue }) => {
    try {
     
      
      const response = await axiosConfig.post("/blog/createblog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create blog");
    }
  }
);

// 📌 2️⃣ Update a Blog
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.put(`/blog/updateblog/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update blog");
    }
  }
);

// 📌 3️⃣ Delete a Blog
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.delete(`/blog/deleteblog/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
    }
  }
);

// 📌 4️⃣ Get All Blogs
export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get("/blog/getallblog");
      return response.data.blogs;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
    }
  }
);

// 📌 5️⃣ Get My Blogs
export const fetchMyBlogs = createAsyncThunk(
  "blog/fetchMyBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get("/blog/getmyblog");
      return response.data.blogs;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch your blogs");
    }
  }
);

// 📌 6️⃣ Get Single Blog
export const fetchSingleBlog = createAsyncThunk(
  "blog/fetchSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get(`/blog/singleblog/${id}`);
      return response.data.blog;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blog");
    }
  }
);

// 🛠️ Blog Slice (Reducer)
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    myBlogs: [],
    singleBlog: null,
    isLoading: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Create Blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Blog created successfully";
        state.blogs.push(action.payload.blog);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      
      // ✅ Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Blog updated successfully";
        const index = state.blogs.findIndex((blog) => blog._id === action.payload.blog._id);
        if (index !== -1) state.blogs[index] = action.payload.blog;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      
      // ✅ Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ✅ Fetch All Blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ✅ Fetch My Blogs
      .addCase(fetchMyBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBlogs = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ✅ Fetch Single Blog
      .addCase(fetchSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearMessages } = blogSlice.actions;
export default blogSlice.reducer;
