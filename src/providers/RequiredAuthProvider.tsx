import { Outlet, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '~/redux/store';
import { useIsClient } from '~/hooks/useIsClient';

interface RequiredAuthProviderProps {
  children: ReactNode;
}

function RequiredAuthProvider(props: RequiredAuthProviderProps) {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("HERER");
      navigate('/auth/login');
    }
  }, []);

  if (!isClient) return <>Loading...</>;

  return <>{props?.children || <Outlet />}</>;
}

export default RequiredAuthProvider;
