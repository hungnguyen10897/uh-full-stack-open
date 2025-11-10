import { useState } from "react";
import blogService from "../services/blogs";
import Toggable from "./Toggable";

const BlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    if (props.testCreate) {
      props.testCreate({
        title: title,
        author: author,
        url: url,
      });
      return;
    }

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      };

      await blogService.create(newBlog);
      props.setNoti(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        props.setNoti(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
      props.setAddedBlog(newBlog);
    } catch {
      props.setErrorMessage("error adding blog");
      setTimeout(() => {
        props.setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <Toggable buttonLabel="create new blog">
      <div>
        <h3>create new</h3>
        <form onSubmit={handleCreate}>
          <div>
            <label>
              title
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url
              <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <br />
          <button type="submit">create</button>
        </form>
      </div>
    </Toggable>
  );
};

export default BlogForm;
