import { Typography } from 'antd';
import LoginForm from '~/components/Login/LoginForm';

function LoginPage() {
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'flex justify-between w-full mb-6'}>
        <div className={'flex flex-col'}>
          <Typography.Title level={3}>Login</Typography.Title>
          <Typography.Text style={{ fontWeight: 300 }}>Manage your UET Hosting App Dashboard</Typography.Text>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
