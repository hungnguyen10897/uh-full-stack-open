const Header = ({ text }) => <h1>{text}</h1>;

const Content = ({ parts }) => {
  const total = parts.reduce((accu, part) => accu + part.exercises, 0);

  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <b>total of {total} exercises</b>
    </div>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
  </div>
);

export default Course;
