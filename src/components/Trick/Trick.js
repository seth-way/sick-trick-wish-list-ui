import './Trick.css';

const Trick = ({ trick }) => {
  const { stance, name, obstacle, tutorial } = trick;
  return (
    <div className='trick'>
      <ul>
        <li>
          {stance} {name}
        </li>
        <li>Obstacle: {obstacle}</li>
        <li>Link to Tutorial:</li>
        <li>
          <a href={tutorial} target='_blank' rel='noreferrer'>
            {tutorial}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Trick;
