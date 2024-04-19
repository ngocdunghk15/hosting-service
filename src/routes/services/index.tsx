import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ServicesLayout from '~/layout/ServicesLayout';
import ServicePage from '~/pages/services/[id]';
import BuildLogs from '~/pages/services/[id]/logs';

export default function ServicesRoutes() {
  return (
    <Routes>
      <Route path={''} element={<ServicesLayout />}>
        <Route path={'/:id'} element={<Outlet />}>
          <Route path={''} element={<Navigate to={'deployments'} />} />
          <Route path={'deployments'} element={<ServicePage />} />
          <Route path={'logs'} element={<BuildLogs />} />
          <Route path={'configurations'} element={<div>Configurations</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
