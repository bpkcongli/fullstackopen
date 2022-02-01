import React, {useState} from 'react';
  
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [
    anecdoteVotes,
    setAnecdoteVotes,
  ] = useState(new Array(anecdotes.length).fill(0));
  
  const selectedAnecdote = anecdotes[selected];
  const selectedAnecdoteVote = anecdoteVotes[selected];
  const mostAnecdoteVotes = Math.max(...anecdoteVotes);
  const anecdoteMostVotesIndex = anecdoteVotes
      .findIndex((vote) => vote === mostAnecdoteVotes);

  const generateNewAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
  };

  const voteAnecdote = () => {
    const anecdoteVotesCopy = [...anecdoteVotes];
    anecdoteVotesCopy[selected] += 1;
    setAnecdoteVotes(anecdoteVotesCopy);
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{selectedAnecdote}<br />has {selectedAnecdoteVote} votes</p>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={generateNewAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>
          {anecdotes[anecdoteMostVotesIndex]}<br />has {mostAnecdoteVotes} votes
        </p>
      </div>
    </div>
  );
}

export default App;
