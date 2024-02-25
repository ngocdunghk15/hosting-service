import { Route, Routes } from 'react-router-dom';
import AuthRoutes from '~/routes/auth';
import HomePage from '~/pages';
import WebRoutes from '~/routes/web';
import AppLayout from '~/layout/AppLayout';
import RequiredAuthProvider from '~/providers/RequiredAuthProvider';

export default function AppRouting() {
  return (
    <Routes>
      <Route path={''} element={<RequiredAuthProvider />}>
        <Route path={''} element={<AppLayout />}>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/web/*'} element={<WebRoutes />} />
        </Route>
      </Route>
      <Route path={'/auth/*'} element={<AuthRoutes />} />;
    </Routes>
  );
}
