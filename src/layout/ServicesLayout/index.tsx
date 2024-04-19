import { Outlet, useParams } from 'react-router-dom';
import { Card, Col, Divider, Layout, Row, Typography } from 'antd';
import { ServiceStatusEnum } from '~/enum/app.enum.ts';
import BadgeStatus from '~/components/shared/BadgeStatus';
import ServiceLayoutMenu from '~/layout/ServicesLayout/Menu';
import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { useEffect } from 'react';
import { loadService } from '~/redux/actions/services.action.ts';

function ServicesLayout() {
  const service = useAppSelector((state) => state.services.currentService.data);
  const params = useParams();
  const id = params?.id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(loadService(id));
    }

    const timer = setInterval(() => {
      if (id) {
        dispatch(loadService(id));
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Layout>
      <div className={'mb-4'}>
        <Typography.Title level={3}>Manage deployments</Typography.Title>
        <Typography.Text type={'secondary'}>Manage all your service deployments here.</Typography.Text>
      </div>
      <Card bordered={false}>
        <Typography.Title level={5} style={{ color: '#bebebe' }}>
          {`Service name: ${service?.name}`}
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Typography>Domain:</Typography>
            <Typography.Link
              onClick={() => {
                if (service?.domain) {
                  window.open(`https://${service?.domain}.duongbd.online`, '_blank');
                }
              }}
            >
              {service?.domain
                ? `https://${service?.domain}.duongbd.online`
                : service?.status === ServiceStatusEnum.FAILED
                  ? 'Failed to deploy app'
                  : 'Waiting for deployment to be ready'}
            </Typography.Link>
          </Col>
          <Col xs={24} md={8}>
            <Typography>Status:</Typography>
            <Typography>{<BadgeStatus status={service?.status} />}</Typography>
          </Col>
          <Col xs={24} md={8}>
            <Typography>Last updated:</Typography>
            <Typography>{new Date(service?.updatedAt).toLocaleString()}</Typography>
          </Col>
        </Row>
      </Card>
      <Divider className={'my-5'} />
      <Layout style={{ background: '#0b0b0b', padding: 24, borderRadius: 16 }}>
        <Layout.Sider style={{ background: 'transparent' }}>
          <ServiceLayoutMenu />
        </Layout.Sider>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default ServicesLayout;
