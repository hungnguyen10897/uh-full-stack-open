import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, setDeletedBlog, likeTestProp }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const [statefulBlog, setBlog] = useState(blog);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBlog = async () => {
    if (likeTestProp) {
      likeTestProp();
      return;
    }
    const updatedBlog = await blogService.likeBlog(statefulBlog);
    setBlog(updatedBlog);
  };

  const handleRemove = async () => {
    const confirmed = window.confirm(
      `Remove blog ${statefulBlog.title} by ${statefulBlog.author}`
    );
    if (confirmed) {
      await blogService.deleteBlog(statefulBlog);
      setDeletedBlog(statefulBlog);
    }
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        {statefulBlog.title} {statefulBlog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  }

  return (
    <li className="blog">
      <div style={blogStyle}>
        <p>
          {statefulBlog.title}
          <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>{statefulBlog.url}</p>
        <p>
          likes {statefulBlog.likes}{" "}
          <button onClick={handleLikeBlog}>like</button>
        </p>
        <p>{statefulBlog.author}</p>
        {user && user.id === statefulBlog.user.id && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </li>
  );
};

export default Blog;
