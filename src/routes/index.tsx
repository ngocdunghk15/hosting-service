import { Route, Routes } from 'react-router-dom';
import AuthRoutes from '~/routes/auth';
import HomePage from '~/pages';
import WebRoutes from '~/routes/web';
import AppLayout from '~/layout/AppLayout';

export default function AppRouting() {
  return (
    <Routes>
      <Route path={''} element={<AppLayout />}>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/web/*'} element={<WebRoutes />} />
      </Route>
      <Route path={'/auth/*'} element={<AuthRoutes />} />;
    </Routes>
  );
}
