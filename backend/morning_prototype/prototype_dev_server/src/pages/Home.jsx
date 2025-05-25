import { useNavigate } from 'react-router-dom';

export default function Home() {

const navigate = useNavigate();

  return (
    <div>
    <h1>Home</h1>
          <button onClick={() => navigate('/assist')}>Go to Assist</button>
      <button onClick={() => navigate('/peter')}>Go to Peter</button>

    </div>
  )
}

