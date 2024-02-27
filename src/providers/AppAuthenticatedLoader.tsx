import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { loadAccountInfo, loadAllProjects } from '~/redux/actions/gitlab.action';
import { setIsConnected } from '~/redux/slice/gitlab.slice';

function AppAuthenticatedLoader() {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state) => state.gitlab.isConnected);
  useEffect(() => {
    dispatch(loadAccountInfo()).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(setIsConnected({ isConnected: true }));
      } else {
        dispatch(setIsConnected({ isConnected: false }));
      }
    });
  }, []);

  useEffect(() => {
    if (isConnected) {
      dispatch(loadAllProjects());
    }
  }, [isConnected]);

  return <Outlet />;
}

export default AppAuthenticatedLoader;
