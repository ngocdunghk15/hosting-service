import { Avatar, Button, Dropdown, Layout, Menu, theme, Typography } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faGlobe, faLaptop, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { authService } from '~/services/auth.service';

const { Header, Footer, Content } = Layout;

function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const account = useAppSelector((state) => state.auth.account);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colorBgContainer
        }}
      >
        <div
          className={'w-full flex items-center'}
          style={{
            maxWidth: 1200,
            margin: '0 auto'
          }}
        >
          <div className='demo-logo' />
          <Menu
            className={'flex-grow-1'}
            theme={'dark'}
            mode='horizontal'
            defaultSelectedKeys={['dashboard']}
            items={[
              {
                key: 'dashboard',
                label: 'Dashboard'
              },
              {
                key: 'guideline',
                label: 'Guide'
              }
            ]}
            style={{ flex: 1, minWidth: 0, backgroundColor: colorBgContainer }}
          />
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: 'static-site',
                  label: 'Static site',
                  icon: <FontAwesomeIcon icon={faLaptop} />
                },
                {
                  key: 'web-service',
                  label: 'Web service',
                  icon: <FontAwesomeIcon icon={faGlobe} />,
                  onClick: () => {
                    navigate('/web/create');
                  }
                }
              ]
            }}
          >
            <Button className={'mr-3'} icon={<FontAwesomeIcon icon={faPlus} />} type={'primary'}>
              New
            </Button>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            placement={'bottomRight'}
            menu={{
              items: [
                {
                  key: 'user-info',
                  label: (
                    <div className={'flex items-center gap-4'} style={{ minWidth: 200, maxWidth: 240 }}>
                      <Avatar className={'cursor-pointer'} src={account?.avatar || null}>
                        {account?.username ? account?.username[0] : 'U'}
                      </Avatar>
                      <Typography.Text ellipsis={true}>{account?.email}</Typography.Text>
                    </div>
                  )
                },
                {
                  type: 'divider'
                },
                {
                  key: 'account',
                  label: 'Personal information',
                  icon: <FontAwesomeIcon icon={faUser} />
                },
                {
                  key: 'settings',
                  label: 'Settings & privacy',
                  icon: <FontAwesomeIcon icon={faGear} />
                },
                {
                  type: 'divider'
                },
                {
                  danger: true,
                  key: 'logout',
                  label: 'Logout',
                  icon: <FontAwesomeIcon icon={faRightFromBracket} />,
                  onClick: async () => {
                    await authService.logout();
                    navigate('/auth/login');
                  }
                }
              ]
            }}
          >
            <Avatar className={'cursor-pointer'} src={account?.avatar || null}>
              {account?.username ? account?.username[0] : 'U'}
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            marginTop: 24,
            padding: '24px 0',
            minHeight: 380,
            maxWidth: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'transparent',
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
}

export default AppLayout;
