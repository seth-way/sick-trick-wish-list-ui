import './App.css';
import { useState, useEffect } from 'react';
import NewTrickForm from '../NewTrickForm/NewTrickForm';
import Trick from '../Trick/Trick';
import { fetchAllTricks } from '../../lib/apiCalls';

function App() {
  const [allTricks, setAllTricks] = useState([]);
  const [formValues, setFormValues] = useState({
    stance: '',
    name: '',
    obstacle: '',
    tutorial: '',
  });

  useEffect(() => {
    const fetchTricks = async () => {
      const tricks = await fetchAllTricks();
      setAllTricks(() => tricks);
    };
    fetchTricks();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSumbit');
  };

  return (
    <div className='App'>
      <h1>Sick Trick Wish List</h1>
      <NewTrickForm
        values={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className='tricks'>
        {allTricks.map((trick, idx) => (
          <Trick trick={trick} key={`${idx}_${trick.name}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
