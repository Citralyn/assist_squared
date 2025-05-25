import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import quizletMapping from "../data/quizletMapping.js";
import styles from '../../styles/Game.module.css';

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stuffToReview = location.state?.stuffToReview || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (currentIndex >= stuffToReview.length) {
      navigate('/results', { state: { scores, quizletMapping } });
    }
  }, [currentIndex, stuffToReview.length, scores, navigate]);

  if (stuffToReview.length === 0) {
    return <p>No subjects to review.</p>;
  }

  // Wait to redirect before accessing out-of-range index
  if (currentIndex >= stuffToReview.length) {
    return <p>Redirecting to results...</p>;
  }

  const currentCourse = stuffToReview[currentIndex];
  const courseKey = currentCourse.replace(/\s+/g, '');
  const gameLink = quizletMapping[courseKey];

  const handleDoneClick = () => {
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const percentage = parseInt(inputValue, 10);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      setScores((prevScores) => ({
        ...prevScores,
        [currentCourse]: percentage
      }));
      setInputValue('');
      setShowModal(false);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('Please enter a valid percentage (0-100).');
    }
  };

  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <div className={styles.container}>
      <h1 className="text-white">Assessing {currentCourse} knowledge</h1>
      <iframe
        src={gameLink}
        height="500"
        width="100%"
        style={{ border: 0 }}
        title={currentCourse}
      />
      <button onClick={handleDoneClick} className={styles.button}>Done With Quiz</button>

      {showModal && (
        <div style={{ backgroundColor: '#000000a0', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div style={{ background: '#fff', margin: '100px auto', padding: '20px', width: '300px' }}>
            <label>
              What percentage correct did you get? 
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                min="0"
                max="100"
              />
            </label>
            <button onClick={handleModalSubmit} className={styles.submitButton}>Submit</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

// fake updates
export default Game;
