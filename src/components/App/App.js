import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Trick from '../Trick/Trick';
import { fetchAllTricks } from '../../lib/apiCalls';

function App() {
  const [allTricks, setAllTricks] = useState([]);

  useEffect(() => {
    const fetchTricks = async () => {
      const tricks = await fetchAllTricks();
      setAllTricks(() => tricks);
    };
    fetchTricks();
  }, []);
  console.log('allTricks', allTricks);
  return (
    <div className='App'>
      <h1>Sick Trick Wish List</h1>
      <div className='tricks'>
        {allTricks.map((trick, idx) => (
          <Trick trick={trick} key={`${idx}_${trick.name}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
