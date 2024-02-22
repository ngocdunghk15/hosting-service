import { Route, Routes } from 'react-router-dom';
import WebCreatePage from '~/pages/web/create';

export default function WebRoutes() {
  return (
    <Routes>
      <Route path={'/create'} element={<WebCreatePage />} />
    </Routes>
  );
}
