import { useNavigate } from 'react-router-dom';
import '../../styles/roadmapstyle.css';

const RoadmapPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="page_container">
      <div className="heading_container">
        <div>
          <h1>Roadmap 🚸</h1>
          <p>
            Let’s go over our journey today! Click on the path you would like to
            explore first.
          </p>
        </div>

        <div className="card_folder">
          {/* Academic card */}
          <div className="card_default" onClick={() => handleNavigation('/assist')}>
            <div className="card_container">
              <div className="card_front">
                <h1>Academic</h1>
              </div>
              <div className="card_back">
                <p>
                  Prerequisite core concepts needed before taking programming courses.
                </p>
              </div>
            </div>
          </div>

          {/* Career card */}
          <div className="card_default" onClick={() => handleNavigation('/career')}>
            <div className="card_container">
              <div className="card_front">
                <h1>Career</h1>
              </div>
              <div className="card_back">
                <p>
                  Career development and industry standard technology resources to use.
                </p>
              </div>
            </div>
          </div>

          {/* Events card */}
          <div className="card_default" onClick={() => handleNavigation('/events')}>
            <div className="card_container">
              <div className="card_front">
                <h1>Events</h1>
              </div>
              <div className="card_back">
                <p>
                  Different on-campus academic, social, and career events you may get
                  involved in at UCI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="submit_button" onClick={() => handleNavigation('/')}>
          <p>Finish all</p>
        </div>
      </div>

      <img src="anteater.png" alt="anteater clip art" className="anteater" />
    </div>
  );
};

export default RoadmapPage;
