import React, {useState} from 'react';

const Button = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticLine = ({text, statistic}) => (
  <tr>
    <td>{text}</td>
    <td>{statistic}</td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = good + neutral + bad;
  const averageFeedback = (good - bad) / totalFeedback;
  const goodFeedbackPercentage = good / totalFeedback * 100;

  return (
    <div>
      <h2>statistics</h2>
      {
        (totalFeedback > 0) ?
        <table>
          <tbody>
            <StatisticLine text="good" statistic={good} />
            <StatisticLine text="neutral" statistic={neutral} />
            <StatisticLine text="bad" statistic={bad} />
            <StatisticLine text="all" statistic={totalFeedback} />
            <StatisticLine text="average" statistic={averageFeedback} />
            <StatisticLine text="positive" statistic={goodFeedbackPercentage} />
          </tbody>
        </table> :
        <div>
          <p>No feedback given</p>
        </div>
      }
    </div>
  )
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={() => {setGood(good + 1)}} />
        <Button text="neutral" onClick={() => {setNeutral(neutral + 1)}} />
        <Button text="bad" onClick={() => {setBad(bad + 1)}} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
