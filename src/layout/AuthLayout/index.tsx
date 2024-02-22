import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import { Card } from 'antd';

function AuthLayout() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Outlet />
      </Card>
    </div>
  );
}

export default AuthLayout;
