import React from 'react';

const PersonForm = (props) => {
  const {nameHandler, numberHandler, addPersonHandler} = props;

  return (
    <form>
      <div>
        name:<input type="text" onChange={nameHandler} />
      </div>
      <div>
        number:<input type="text" onChange={numberHandler} />
      </div>
      <div>
        <button type="submit" onClick={addPersonHandler}>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
