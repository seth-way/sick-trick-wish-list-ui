import './NewTrickForm.css';

const stances = ['Regular', 'Switch'];
const obstacles = ['Flatground', 'Ledge', 'Rail', 'Stairs', 'Pool'];

const NewTrickForm = ({ values, handleChange, handleSubmit }) => {
  const { stance, name, obstacle, tutorial } = values;
  return (
    <form onSubmit={handleSubmit}>
      <select name='stance' value={stance} onChange={handleChange}>
        <option value=''>Choose your Stance</option>
        {stances.map((stance, idx) => (
          <option value={stance} key={`${idx}_${stance}`}>
            {stance}
          </option>
        ))}
      </select>
      <input
        type='text'
        name='name'
        value={name}
        onChange={handleChange}
        placeholder='Name of Trick'
      />
      <select name='obstacle' value={obstacle} onChange={handleChange}>
        <option value=''>Choose your Obstacle</option>
        {obstacles.map((obstacle, idx) => (
          <option value={obstacle} key={`${idx}_${obstacle}`}>
            {obstacle}
          </option>
        ))}
      </select>
      <input
        type='text'
        name='tutorial'
        value={tutorial}
        onInput={handleChange}
        placeholder='Link to Tutorial'
      />
      <button type='submit'>Send It!</button>
    </form>
  );
};

export default NewTrickForm;
