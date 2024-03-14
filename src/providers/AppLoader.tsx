import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccountInfo } from '~/redux/actions/auth.action.ts';
import { Status } from '~/enum/app.enum.ts';
import { useIsClient } from '~/hooks/useIsClient.ts';

function AppLoader() {
  const dispatch = useAppDispatch();
  const getAccountInfoStatus = useAppSelector((state) => state.auth.account.status);
  const isClient = useIsClient();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, []);

  if (getAccountInfoStatus === Status.PENDING || !isClient) return <>Loading...</>;

  return <Outlet />;
}

export default AppLoader;
