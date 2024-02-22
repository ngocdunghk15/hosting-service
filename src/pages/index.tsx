import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/auth/login');
  }, []);
  return <>Home Page</>;
}
