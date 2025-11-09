import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
      </p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes} <button>like</button>
      </p>
      <p>{blog.author}</p>
    </div>
  );
};

export default Blog;
