import { Route, Routes } from 'react-router-dom';
import ServicesLayout from '~/layout/ServicesLayout';
import ServicePage from '~/pages/services/[id]';

export default function ServicesRoutes() {
  return (
    <Routes>
      <Route path={''} element={<ServicesLayout />}>
        <Route path={'/:id'} element={<ServicePage />} />
      </Route>
    </Routes>
  );
}
