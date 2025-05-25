import { useCardContext } from '../context/CardContext.jsx';

const NextPage = () => {
  const { cards } = useCardContext();

  return (
    <div>
      <h1>Your Selected Courses</h1>
      {cards.map((card, idx) => (
        <div key={idx}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NextPage;
