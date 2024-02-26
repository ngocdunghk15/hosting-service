import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '~/redux/store';
import { loadAccountInfo } from '~/redux/actions/gitlab.action';
import { setIsConnected } from '~/redux/slice/gitlab.slice';

function AppAuthenticatedLoader() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadAccountInfo()).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(setIsConnected({ isConnected: true }));
      } else {
        dispatch(setIsConnected({ isConnected: false }));
      }
    });
  }, []);
  return <Outlet />;
}

export default AppAuthenticatedLoader;