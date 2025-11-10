import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: true,
    likes: 1,
    author: "Me",
  };

  render(<Blog blog={blog} />);

  const element1 = screen.getByText(blog.title, { exact: false });
  expect(element1).toBeDefined();

  const element2 = screen.getByText(blog.author, { exact: false });
  expect(element2).toBeDefined();
});
