import { useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';

const Results = () => {
  const location = useLocation();
  const { scores, quizletMapping } = location.state || {};

  if (!scores || Object.keys(scores).length === 0) {
    return <p>No results available.</p>;
  }

  const courseNames = Object.keys(scores);
  const percentages = courseNames.map((course) => scores[course]);

  // Find the course with the lowest score
  const minIndex = percentages.indexOf(Math.min(...percentages));
  const courseToWorkOn = courseNames[minIndex];

  return (
    <div>
      <h1>Your Quiz Results</h1>

      <Plot
        data={[
          {
            x: courseNames,
            y: percentages,
            type: 'bar',
            marker: { color: 'teal' },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Quiz Performance by Course',
          yaxis: { title: 'Percentage Correct', range: [0, 100] },
        }}
      />

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '6px' }}>
        <h2>You should work more on:</h2>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'red' }}>{courseToWorkOn}</p>
      </div>
    </div>
  );
};

export default Results;
