import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthLayout from '~/layout/AuthLayout';
import AuthGitlabCallback from '~/pages/auth/gitlab/callback';
import PassAuthProvider from '~/providers/PassAuthProvider.tsx';

const LoginPage = lazy(() => import('~/pages/auth/login'));
const RegisterPage = lazy(() => import('~/pages/auth/register'));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to={'sign-in'} />} />
      <Route path={''} element={<AuthLayout />}>
        <Route path={''} element={<PassAuthProvider />}>
          <Route path={'/login'} element={<Suspense fallback={<>Loading...</>}>{<LoginPage />}</Suspense>} />
        </Route>
        <Route path={''} element={<PassAuthProvider />}>
          <Route path={'/register'} element={<Suspense fallback={<>Loading...</>}>{<RegisterPage />}</Suspense>} />
        </Route>
        <Route path={'/gitlab/callback'} element={<AuthGitlabCallback />} />
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
