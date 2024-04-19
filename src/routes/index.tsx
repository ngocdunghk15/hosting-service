import { Route, Routes } from 'react-router-dom';
import AuthRoutes from '~/routes/auth';
import HomePage from '~/pages';
import WebRoutes from '~/routes/web';
import AppLayout from '~/layout/AppLayout';
import RequiredAuthProvider from '~/providers/RequiredAuthProvider';
import AppAuthenticatedLoader from '~/providers/AppAuthenticatedLoader';
import AppLoader from '~/providers/AppLoader.tsx';
import ServicesRoutes from '~/routes/services';

export default function AppRouting() {
  return (
    <Routes>
      <Route path={''} element={<AppLoader />}>
        <Route
          path={''}
          element={
            <RequiredAuthProvider>
              <AppAuthenticatedLoader />
            </RequiredAuthProvider>
          }
        >
          <Route path={''} element={<AppLayout />}>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/web/*'} element={<WebRoutes />} />
            <Route path={'/services/*'} element={<ServicesRoutes />} />
          </Route>
        </Route>
      </Route>
      <Route path={'/auth/*'} element={<AuthRoutes />} />;
    </Routes>
  );
}
