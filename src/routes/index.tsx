import { Route, Routes } from 'react-router-dom';
import AuthRoutes from '~/routes/auth';
import HomePage from '~/pages';

export default function AppRouting() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/auth/*'} element={<AuthRoutes />} />
    </Routes>
  );
}
