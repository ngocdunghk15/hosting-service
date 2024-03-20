import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/redux/store.ts';
import { useIsClient } from '~/hooks/useIsClient.ts';
import { useEffect } from 'react';

function PassAuthProvider() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isClient = useIsClient();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  if (!isClient) return <>Loading...PassAuth</>;
  return <Outlet />;
}

export default PassAuthProvider;
