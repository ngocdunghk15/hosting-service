import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthLayout from '~/layout/AuthLayout';

const LoginPage = lazy(() => import('~/pages/auth/login'));
const RegisterPage = lazy(() => import('~/pages/auth/register'));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to={'sign-in'} />} />
      <Route path={''} element={<AuthLayout />}>
        <Route path={'/login'} element={<Suspense fallback={<>Loading...</>}>{<LoginPage />}</Suspense>} />
        <Route path={'/register'} element={<Suspense fallback={<>Loading...</>}>{<RegisterPage />}</Suspense>} />
        <Route
          path={'*'}
          element={
            <Suspense fallback={<>Loading...</>}>
              <>Not Found Page...</>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
