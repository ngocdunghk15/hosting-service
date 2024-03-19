import { Button, Dropdown, Input, Layout, Select, Table, TableProps, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faGlobe, faLaptop, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { useEffect } from 'react';
import { loadServices } from '~/redux/actions/services.action.ts';
import { Service } from '~/types/service.type.ts';
import { useNavigate } from 'react-router-dom';
import { Status } from '~/enum/app.enum.ts';
import BadgeStatus from '~/components/shared/BadgeStatus';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        return <BadgeStatus status={status} />;
      }
    },
    {
      key: 'domain',
      title: 'Domain',
      dataIndex: 'domain',
      render: (domain) => {
        return (
          <Typography.Link
            onClick={(e) => {
              e.stopPropagation();
              if (domain) {
                window.open(`https://${domain}.duongbd.online `, '_blank');
              }
            }}
          >
            {domain ? `${domain}.duongbd.online ` : 'NULL'}
          </Typography.Link>
        );
      }
    },
    {
      key: 'runtime',
      title: 'Runtime',
      dataIndex: 'runtime',
      render: (runtime) => {
        return <Typography>{String(runtime ? runtime : 'NULL').toUpperCase()}</Typography>;
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
      render: (_, __) => {
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
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/services/${record?._id}`);
            }
          };
        }}
        loading={loadServicesStatus === Status.PENDING}
        columns={columns}
        dataSource={services}
      />
    </Layout>
  );
}
