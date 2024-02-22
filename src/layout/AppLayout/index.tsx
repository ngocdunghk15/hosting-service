import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh'}}>
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
        <div className='demo-logo' />
        <Menu
          theme={'dark'}
          mode='horizontal'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              label: 'Dashboard'
            },
            {
              key: '2',
              label: 'Community'
            }
          ]}
          style={{ flex: 1, minWidth: 0, backgroundColor: colorBgContainer }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            marginTop: 24,
            padding: 24,
            minHeight: 380,
            background: 'transparent',
            borderRadius: borderRadiusLG,
            maxWidth: 768,
            marginLeft: 'auto',
            marginRight: 'auto'
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
