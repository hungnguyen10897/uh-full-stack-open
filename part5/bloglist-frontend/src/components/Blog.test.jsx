import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("renders title and author", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "url.com",
    likes: 1,
    author: "Me",
  };

  render(<Blog blog={blog} />);

  const element1 = screen.getByText(blog.title, { exact: false });
  expect(element1).toBeDefined();

  const element2 = screen.getByText(blog.author, { exact: false });
  expect(element2).toBeDefined();
});

test("renders url and likes when view button is clicked", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "url.com",
    likes: 1,
    author: "Me",
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const element1 = screen.getByText(blog.url, { exact: false });
  expect(element1).toBeDefined();

  const element2 = screen.getByText(blog.likes, { exact: false });
  expect(element2).toBeDefined();
});

test("clicking like button twice calls the event handler twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "url.com",
    likes: 1,
    author: "Me",
    user: {
      id: "ID",
    },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} likeTestProp={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "url.com",
    likes: 1,
    author: "Me",
    user: {
      id: "ID",
    },
  };

  const mockHandler = vi.fn();

  render(<BlogForm testCreate={mockHandler} />);

  const user = userEvent.setup();

  const toggleButton = screen.getByText("create new blog");
  await user.click(toggleButton);

  const inputs = screen.getAllByRole("textbox");
  const createButton = screen.getByText("create");

  await user.type(inputs[0], blog.title);
  await user.type(inputs[1], blog.author);
  await user.type(inputs[2], blog.url);

  await user.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);

  console.log(mockHandler.mock.calls);

  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title);
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author);
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url);
});
