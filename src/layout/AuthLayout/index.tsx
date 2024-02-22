import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import { Card, Typography } from 'antd';

function AuthLayout() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={'flex flex-col items-center'}>
          <div className={'flex justify-between w-full mb-6'}>
            <div className={'flex flex-col'}>
              <Typography.Title level={3}>UET Hosting</Typography.Title>
              <Typography.Text style={{ fontWeight: 300 }}>Welcome to UET Hosting Services</Typography.Text>
            </div>
          </div>
          <Outlet />
        </div>
      </Card>
    </div>
  );
}

export default AuthLayout;
