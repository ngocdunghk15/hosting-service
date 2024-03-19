import { Button, Dropdown, Input, Layout, Select, Table, TableProps, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faGlobe, faLaptop, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { useEffect } from 'react';
import { loadServices } from '~/redux/actions/services.action.ts';
import { Service } from '~/types/service.type.ts';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.services.services.data);
  const loadServicesStatus = useAppSelector((state) => state.services.services.status);

  const columns: TableProps<Service>['columns'] = [
    {
      key: 'name',
      title: 'Service name',
      dataIndex: 'name'
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        console.log({ status });
        return <>{String(status ? status : 'IDLE').toUpperCase()}</>;
      }
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      render: (_) => {
        return <>Service Type</>;
      }
    },
    {
      key: 'runtime',
      title: 'Runtime',
      dataIndex: 'runtime',
      render: (runtime) => {
        return <>Runtime</>;
      }
    },
    {
      key: 'lastDeployed',
      title: 'Last Deployed',
      dataIndex: 'updatedAt',
      render: (updatedAt) => {
        return <>{new Date(updatedAt).toLocaleString()}</>;
      }
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => {
        return <FontAwesomeIcon icon={faEllipsis} />;
      }
    }
  ];

  useEffect(() => {
    dispatch(loadServices());
  }, []);
  return (
    <Layout>
      <div className={'mb-12'}>
        <Typography.Title level={3}>Services overview</Typography.Title>
        <Typography.Text type={'secondary'}>Manage all your services here.</Typography.Text>
      </div>
      <div className={'flex gap-8 mb-6'}>
        <Input
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          className={'flex-grow-1'}
          placeholder={'Search services...'}
        />
        <Select
          defaultValue={'sort-by-activity' as any}
          style={{ width: 240 }}
          options={
            [
              {
                value: 'sort-by-activity',
                label: 'Sort by activity'
              },
              {
                value: 'sort-by-name',
                label: 'Sort by name'
              }
            ] as any
          }
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
                icon: <FontAwesomeIcon icon={faGlobe} />
              }
            ]
          }}
        >
          <Button icon={<FontAwesomeIcon icon={faPlus} />} type={'primary'}>
            Create new service
          </Button>
        </Dropdown>
      </div>
      <Table columns={columns} dataSource={services} />
    </Layout>
  );
}
