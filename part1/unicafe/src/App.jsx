import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Stats = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const score = good - bad;
  const average = score / all;
  const positive = good / all;

  if (all == 0) {
    return (
      <div>
        <b>
          <p>Statistics</p>
        </b>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <b>
        <p>Statistics</p>
      </b>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive * 100} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <p>
        <b>Give feedback</b>
      </p>
      <Button
        onClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />

      <Stats good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
