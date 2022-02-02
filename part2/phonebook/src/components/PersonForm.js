import React from 'react';

const PersonForm = (props) => {
  const {name, number, nameHandler, numberHandler, addPersonHandler} = props;

  return (
    <form>
      <div>
        name:<input type="text" value={name} onChange={nameHandler} />
      </div>
      <div>
        number:<input type="text" value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit" onClick={addPersonHandler}>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
