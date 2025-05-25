import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardContext } from '../context/CardContext.jsx';
import { Modal, Button } from 'react-bootstrap';
import styles from '../../styles/NextPage.module.css';

const NextPage = () => {
  const { cards } = useCardContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stuffToReview, setStuffToReview] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingCard, setPendingCard] = useState(null);

  const navigate = useNavigate();

  const handleNext = (reviewCardTitle = null) => {
    const nextIndex = currentIndex + 1;

    const updateAndNavigate = (updatedList) => {
        if (nextIndex < cards.length) {
        setStuffToReview(updatedList);
        setCurrentIndex(nextIndex);
        } else {
        navigate('/gamepage', { state: { stuffToReview: updatedList } });
        }
    };

    if (reviewCardTitle) {
        const updated = [...stuffToReview, reviewCardTitle];
        updateAndNavigate(updated);
    } else {
        updateAndNavigate(stuffToReview);
    }
};

  const handleResponse = (response) => {
  const currentCard = cards[currentIndex];

  if (response === 'GOOD') {
    handleNext();
  } else if (response === 'BAD') {
    handleNext(currentCard.title);
  } else if (response === 'MEH') {
    setPendingCard(currentCard.title);
    setShowModal(true);
  }
};

  const handleModalChoice = (takeQuiz) => {
  if (takeQuiz && pendingCard) {
    handleNext(pendingCard);
  } else {
    handleNext();
  }
  setShowModal(false);
  setPendingCard(null);
};

  const currentCard = cards[currentIndex];

  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <div className={styles.container}>
      <h1>{currentCard.title}</h1>
      <p>{currentCard.description}</p>
      <h4 className="pb-4">How well do you feel about this subject?</h4>
      <div className={styles.btnGroup}>
        <button className="btn btn-success" onClick={() => handleResponse('GOOD')}>GOOD 😃</button>
        <button className="btn btn-secondary" onClick={() => handleResponse('MEH')}>MEH 🤔</button>
        <button className="btn btn-danger" onClick={() => handleResponse('BAD')}>BAD 😰</button>
      </div>
      {/* MAKE SURE THE MODAL IS THE CORRECT COLOR! */ }
      <Modal show={showModal} onHide={() => handleModalChoice(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Prompt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to take a quiz to assess your knowledge on the subject?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalChoice(false)}>No</Button>
          <Button variant="primary" onClick={() => handleModalChoice(true)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default NextPage;
