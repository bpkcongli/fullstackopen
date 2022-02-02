import React from 'react';

const Header = ({course}) => {
  return (
    <h2>{course.name}</h2>
  );
};

const Total = ({course}) => {
  const sum = course.parts.reduce((p, c) => p + c.exercises, 0);
  return (
    <p><b>total of {sum} exercises</b></p>
  );
};

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({course}) => {
  return (
    <div>
      {
        course.parts.map((part) => <Part part={part} key={part.id} />)
      }
    </div>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;