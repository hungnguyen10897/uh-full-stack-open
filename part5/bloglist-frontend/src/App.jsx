import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Error from "./components/Error";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [noti, setNoti] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [addedBlog, setAddedBlog] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [addedBlog]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      };

      await blogService.create(newBlog);
      setNoti(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setNoti(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
      setAddedBlog(newBlog);
    } catch {
      setErrorMessage("error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div>{Error({ message: errorMessage })}</div>
        <br />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <div>{Notification({ message: noti })}</div>

      <h3>{user.name} logged in</h3>
      <button type="submit" onSubmit={handleLogout}>
        logout
      </button>

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
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
