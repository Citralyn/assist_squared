import { useNavigate } from 'react-router-dom';
import '../../styles/resultsstyle.css';

const Events = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/resources'); // Adjust the path as needed
  };

  return (
    <div className="events-page">
      {/* Optional anteater image */}
      {/* <img src="/anteater.png" alt="anteater clip art" className="anteater" /> */}

      <div className="heading">
        <h1>Important Events. Don't miss!</h1>
      </div>

      <div className="section-container">
        <div className="section">
          <h2 className="section-heading">Academic</h2>

          <div className="card-container">
            <div className="card">
              <h3>Annual ICS Project Expo</h3>
              <p>
                Showcase projects from undergraduate capstone programs from Informatics,
                Computer Science, and Data Science.
              </p>
            </div>

            <div className="card">
              <h3>Career Fairs</h3>
              <p>
                Learn about job and internship opportunities offered by companies,
                government agencies, and non-profit organizations.
              </p>
            </div>

            <div className="card">
              <h3>CS Seminar Series</h3>
              <p>
                Allow faculty, students and the ICS community to come together and learn
                from experts about their research.
              </p>
            </div>

            <div className="card">
              <h3>Information Systems Group Talks</h3>
              <p>
                Listen to the professors and learn about new technologies, research as
                well as their experiences.
              </p>
            </div>

            <div className="card">
              <h3>Club Workshops</h3>
              <p>
                Hands-on learning experiences, networking opportunities, and practical
                skill development.
              </p>
            </div>

            <div className="card">
              <h3>Hackathons</h3>
              <p>
                An intensive, collaborative environment where participants can rapidly
                develop innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="back-button" onClick={handleBack}>
        Start Over
        <img
          src="/return.svg"
          alt="arrow cursor icon pointing up"
          className="arrow-icon"
          style={{ marginLeft: '8px', verticalAlign: 'middle' }}
        />
      </button>
    </div>
  );
};

export default Events;
