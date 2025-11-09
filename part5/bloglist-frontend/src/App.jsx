import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
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

  const [user, setUser] = useState(null);
  const [addedBlog, setAddedBlog] = useState(null);
  const [deletedBlog, setDeletedBlog] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sorted);
    });
  }, [addedBlog, deletedBlog]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
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
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
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
    window.localStorage.removeItem("loggedBlogAppUser");
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
      {user.name} logged in
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <BlogForm
        setNoti={setNoti}
        setErrorMessage={setErrorMessage}
        setAddedBlog={setAddedBlog}
      />
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setDeletedBlog={setDeletedBlog}
        />
      ))}
    </div>
  );
};

export default App;
