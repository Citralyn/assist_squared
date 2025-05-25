import { useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';
import styles from '../../styles/Results.module.css'

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
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <div className={styles.center}>
      <h1>Your Quiz Results 🌟</h1>

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

      <div style={{ marginTop: '.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '6px' }}>
        <h2>You should work more on:</h2>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#FFB3E3' }}>{courseToWorkOn}</p>
      </div>
    </div>
    </>
  );
};

export default Results;
