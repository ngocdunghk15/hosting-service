import { Button, Dropdown, Input, Layout, message, Table, TableProps, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faGlobe, faLaptop, faMagnifyingGlass, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '~/redux/store.ts';
import { useEffect, useRef } from 'react';
import { loadServices } from '~/redux/actions/services.action.ts';
import { Service } from '~/types/service.type.ts';
import { useNavigate } from 'react-router-dom';
import { Status } from '~/enum/app.enum.ts';
import BadgeStatus from '~/components/shared/BadgeStatus';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { servicesService } from '~/services/services.service.ts';

export default function HomePage() {
  const isFirstLoad = useRef(true);
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
        return (
          <Tag>
            <Typography>{String(runtime ? runtime : 'NULL').toUpperCase()}</Typography>
          </Tag>
        );
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
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'view',
                  label: 'View',
                  icon: <FontAwesomeIcon icon={faEye} />,
                  onClick: () => {
                    navigate(`/services/${record?._id}`);
                  }
                },
                {
                  type: 'divider'
                },
                {
                  danger: true,
                  key: 'remove',
                  label: 'Remove',
                  icon: <FontAwesomeIcon icon={faTrash} />,
                  onClick: async () => {
                    try {
                      await servicesService.remove(record?._id);
                      message.success('Remove service successfully!');
                    } catch {
                      message.error('Failed to remove service!');
                    }
                  }
                }
              ]
            }}
          >
            <FontAwesomeIcon className={'cursor-pointer'} icon={faEllipsis} />
          </Dropdown>
        );
      }
    }
  ];

  useEffect(() => {
    dispatch(loadServices()).finally(() => {
      isFirstLoad.current = false;
    });
    const timer = setInterval(() => {
      dispatch(loadServices());
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Layout>
      <div className={'mb-12'}>
        <Typography.Title level={3}>Services overview</Typography.Title>
        <Typography.Text type={'secondary'}>Manage all your services here.</Typography.Text>
      </div>
      <div className={'flex gap-8 mb-6'}>
        <Input
          disabled={true}
          prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          className={'flex-grow-1'}
          placeholder={'Search services...'}
        />
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              {
                key: 'static-site',
                label: 'Static site',
                icon: <FontAwesomeIcon icon={faLaptop} />,
                disabled: true
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
        loading={loadServicesStatus === Status.PENDING && isFirstLoad.current}
        columns={columns}
        dataSource={services}
        pagination={{
          pageSize: 10
        }}
      />
    </Layout>
  );
}
