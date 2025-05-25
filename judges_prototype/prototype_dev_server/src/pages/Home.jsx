import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Home.module.css';
import "../index.css";
export default function Home() {

const navigate = useNavigate();

  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <img src="public/anteater.png" alt="anteater clip art" className={styles.anteater}/>
    <div className={styles.container}>
        <h1 className={styles.welcomeText}>👋 Hi there,</h1>
        <h2 className={styles.heroText}>ICS Transfer Student!</h2>
        <p>Want to prepare for your courses and career? Assess your knowledge and supplement your learning!</p>
    <div className={styles.buttonContainer}>
      <div className={styles.buttonContain}>
        <button onClick={() => navigate('/assist')} className={styles.assistButton}>
          Assist <img src="arrow-up.svg" alt="cursor pointing up icon" width={32} height={32}/>
        </button>
        
      </div>
      <div className={styles.buttonContain}>
        <button onClick={() => navigate('/peter')} className={styles.peterButton}>
          Resources <img src="resource.svg" alt="bookmark icon" width={32} height={32}/>
        </button>
      </div>
    </div>
    </div>
    </>
  )
}

