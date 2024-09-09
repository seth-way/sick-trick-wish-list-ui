import './App.css';
import { useState, useEffect } from 'react';
import NewTrickForm from '../NewTrickForm/NewTrickForm';
import Trick from '../Trick/Trick';
import { fetchAllTricks, postTrick } from '../../lib/apiCalls';

function App() {
  const [allTricks, setAllTricks] = useState([]);

  const emptyForm = {
    stance: '',
    name: '',
    obstacle: '',
    tutorial: '',
  };

  const [formValues, setFormValues] = useState({
    ...emptyForm,
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

  const handleSubmit = async e => {
    e.preventDefault();
    const { stance, name, obstacle, tutorial } = formValues;
    if (stance && name && obstacle && tutorial) {
      try {
        const newTrick = await postTrick(formValues);
        if (newTrick.id) {
          setAllTricks(prevTricks => [...prevTricks, newTrick]);
          setFormValues({ ...emptyForm });
        }
      } catch (err) {
        console.error(err);
      }
    }
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
