import { Route, Routes } from 'react-router-dom';
import WebCreatePage from '~/pages/web/create';
import WebSelectRepoPage from '~/pages/web/select-repo';
import WebNewPage from '~/pages/web/new';

export default function WebRoutes() {
  return (
    <Routes>
      <Route path={'/create'} element={<WebCreatePage />} />
      <Route path={'/select-repo'} element={<WebSelectRepoPage />} />
      <Route path={'/new'} element={<WebNewPage />} />
    </Routes>
  );
}
