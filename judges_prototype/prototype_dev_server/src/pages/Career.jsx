import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/careerstyle.css';

const careerTools = [
  {
    name: 'GitHub',
    description:
      'This tutorial teaches you GitHub essentials like repositories, branches, commits, and pull requests.',
  },
  {
    name: 'LinkedIn',
    description:
      'Build your professional profile, connect with others in your field, and discover job opportunities.',
  },
  {
    name: 'LeetCode',
    description:
      'Practice coding problems to prepare for technical interviews at top tech companies.',
  },
  {
    name: 'Handshake',
    description:
      'Discover internships, career events, and job postings tailored to students and new grads.',
  },
  {
    name: 'Resume Builder',
    description:
      'Use templates and tips to craft a strong, ATS-friendly resume that highlights your skills.',
  },
  {
    name: 'CodeSandbox',
    description:
      'A web-based code editor to prototype and share front-end projects instantly with others.',
  },
];

const Career = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = careerTools.length;

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  };

  const goToCard = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Optional: auto-scroll carousel every few seconds
    // const interval = setInterval(nextCard, 5000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="career-page">
      <div className="heading_container">
        <h1>Explore your development career tools</h1>
      </div>

      <div className="carousel-navigate">
        <div className="carousel-container">
          <button className="nav-arrow left" onClick={prevCard}>
            ‹
          </button>

          <div className="carousel-track">
            {careerTools.map((tool, index) => {
              let className = 'card';
              const offset = index - currentIndex;

              if (offset === 0) className += ' center';
              else if (offset === -1 || offset === totalCards - 1) className += ' left-1';
              else if (offset === -2 || offset === totalCards - 2) className += ' left-2';
              else if (offset === 1 || offset === -(totalCards - 1)) className += ' right-1';
              else if (offset === 2 || offset === -(totalCards - 2)) className += ' right-2';

              return (
                <div key={index} className={className} data-index={index}>
                  <div className="card_default">
                    <div className="text_holder">
                      <h2>{tool.name}</h2>
                      <h6>{tool.description}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="nav-arrow right" onClick={nextCard}>
            ›
          </button>
        </div>

        <div className="dots">
          {careerTools.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToCard(index)}
            ></div>
          ))}
        </div>
      </div>


      <img src="public/anteater.png" alt="anteater clip art" className="anteater" />
    </div>
  );
};

export default Career;
