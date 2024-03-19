import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Card, Col, Divider, Input, Layout, Row, Table, TableProps, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { loadService, loadServiceHistories } from '~/redux/actions/services.action.ts';
import { ServiceHistory } from '~/types/service.type.ts';
import { ServiceStatusEnum, Status } from '~/enum/app.enum.ts';
import Pipeline from '~/components/shared/Pipeline';
import BadgeStatus from '~/components/shared/BadgeStatus';

function ServicePage() {
  const params = useParams();
  const isFirstLoad = useRef(true);
  const id = params?.id;
  const dispatch = useAppDispatch();
  const loadServiceHistoriesStatus = useAppSelector((state) => state.services.currentService.histories.status);
  const serviceHistories = useAppSelector((state) => state.services.currentService.histories.data);
  const service = useAppSelector((state) => state.services.currentService.data);

  const columns: TableProps<ServiceHistory>['columns'] = [
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'deployStatus',
      render: (status) => {
        switch (status) {
          case ServiceStatusEnum.SUCCESS: {
            return <Tag color={'green'}>Passed</Tag>;
          }
          default: {
            return <Tag>FAILED</Tag>;
          }
        }
      }
    },
    {
      key: 'pipeline',
      title: 'Pipeline',
      render: (_, record) => {
        const pushStatus =
          record?.buildStatus === ServiceStatusEnum.SUCCESS
            ? record?.deployStatus === ServiceStatusEnum.WAIT
              ? ServiceStatusEnum.PENDING
              : ServiceStatusEnum.SUCCESS
            : ServiceStatusEnum.WAIT;
        return <Pipeline pipeline={[record?.buildStatus, pushStatus, record?.deployStatus]} />;
      }
    },
    {
      key: 'updatedAt',
      title: 'Last updated',
      dataIndex: 'updatedAt',
      render: (date) => <Typography>{new Date(date).toLocaleString()}</Typography>
    }
  ];

  useEffect(() => {
    if (id) {
      dispatch(loadService(id));
      dispatch(loadServiceHistories(id)).finally(() => {
        isFirstLoad.current = false;
      });
    }

    const timer = setInterval(() => {
      if (id) {
        dispatch(loadService(id));
        dispatch(loadServiceHistories(id));
      }
    }, 10000);

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
                window.open(`https://${service?.domain}.duongbd.online`, '_blank');
              }}
            >{`https://${service?.domain}.duongbd.online`}</Typography.Link>
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
      <div className={'flex gap-8 mb-6'}>
        <Input
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          className={'flex-grow-1'}
          placeholder={'Search deployments...'}
        />
      </div>
      <Table
        loading={loadServiceHistoriesStatus === Status.PENDING && isFirstLoad.current}
        columns={columns}
        dataSource={serviceHistories}
      />
    </Layout>
  );
}

export default ServicePage;
