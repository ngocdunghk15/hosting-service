import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '~/redux/store';
import { useIsClient } from '~/hooks/useIsClient';

function RequiredAuthProvider() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
    }
  }, []);

  if (!isClient) return <>Loading...</>;

  return (
    <>
      <Outlet />
    </>
  );
}

export default RequiredAuthProvider;
